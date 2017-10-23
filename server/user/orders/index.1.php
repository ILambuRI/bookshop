<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Orders extends Rest
{
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Receive all user orders through a unique users hash.
     * /hash - input.
     * Return array.
     */
    protected function getOrdersByParams()
    {
        if ( !$userInfo = $this->getUserInfoByHash($this->params['params']) )
            $this->response( '', 404, '030', true );
    
        $sql = 'SELECT bookshop_orders.id,
                       bookshop_books.booksName,
                       bookshop_info_order.bookDiscount,
                       bookshop_info_order.count,
                       bookshop_info_order.bookTotalPrice,
                       bookshop_payment.paymentName,
                       bookshop_orders.clientDiscount,
                       bookshop_orders.orderTotalPrice,
                       bookshop_orders.time,
                       bookshop_status.statusName
                FROM bookshop_info_order
                INNER JOIN bookshop_orders
                    ON bookshop_info_order.id_order = bookshop_orders.id
                INNER JOIN bookshop_payment
                    ON bookshop_orders.id_payment = bookshop_payment.id
                INNER JOIN bookshop_status
                    ON bookshop_orders.id_status = bookshop_status.id
                INNER JOIN bookshop_books
                    ON bookshop_info_order.id_book = bookshop_books.id
                WHERE bookshop_orders.id_user = :id';

        $result = $this->db->execute($sql, ['id' => $userInfo[0]['id']]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $orders = $this->formingOrders($result);
        $this->response($orders);
    }

    /**
     * Record a new order in the table orders(and info_order) and clear user cart.
     * hash | id(payment) - input.
     * Return order ID.
     */
    protected function postOrders()
    {
        if ( !$userInfo = $this->getUserInfoByHash($this->params['hash']) )
            $this->response( '', 404, '027', true );
        
        if ( !$this->checkPaymentId($this->params['id']) )
            $this->response( '', 404, '028', true );

        $cartData = $this->getUserCartData($userInfo[0]['id']);

        if (!$cartData)
            $this->response( '', 404, '029', true );
        
        /* Forming parameters for a transaction in a table info_order */
        foreach ($cartData as $key => $notUsed)
        {
            $infoOrder[$key]['id_book'] = $cartData[$key]['id_book'];
            $infoOrder[$key]['bookDiscount'] = $cartData[$key]['percent'];
            $infoOrder[$key]['count'] = $cartData[$key]['count'];
            $totalPrice = (int)$cartData[$key]['price'] * (int)$cartData[$key]['count'];            

            if ((int)$cartData[$key]['percent'])
                $totalPrice -= $totalPrice * (int)$cartData[$key]['percent'] / 100;
            
            $infoOrder[$key]['bookTotalPrice'] = $totalPrice;
            $orderTotalPrice += $totalPrice;
        }

        /* Forming parameters for insert in a table orders */
        $order['id_user'] = $userInfo[0]['id'];
        $order['id_payment'] = $this->params['id'];
        $order['clientDiscount'] = $userInfo[0]['percent'];

        if ((int)$order['clientDiscount'])
            $orderTotalPrice -= $orderTotalPrice * (int)$order['clientDiscount'] / 100;

        $order['orderTotalPrice'] = $orderTotalPrice;
        $order['time'] = time();
        /* Default status */
        $order['id_status'] = 4;

        $sql = 'INSERT INTO bookshop_orders (id_user, clientDiscount, id_payment, orderTotalPrice, time, id_status)
                VALUES (:id_user, :clientDiscount, :id_payment, :orderTotalPrice, :time, :id_status)';
        $result = $this->db->execute($sql, $order);
        
        if (!$result)
            $this->response( '', 404, '031', true );

        /* Get the ID of the inserted order */
        $orderId = $this->db->dbh->lastInsertId();

        // foreach ($infoOrder as $key => $arrParams)
        // {
        //     $sql = 'INSERT INTO bookshop_info_order (id_order, id_book, bookDiscount, count, bookTotalPrice)
        //             VALUES (' .$orderId. ', :id_book, :bookDiscount, :count, :bookTotalPrice)';
        //     $result = $this->db->execute($sql, $arrParams);
        // }

        $sql = 'INSERT INTO bookshop_info_order (id_order, id_book, bookDiscount, count, bookTotalPrice)
                VALUES (' .$orderId. ', :id_book, :bookDiscount, :count, :bookTotalPrice)';
        $result = $this->db->execTransaction($sql, $infoOrder);

        if (!$result)
            $this->response( '', 404, '032', true );
        
        /* Clear user cart */
        $sql = 'DELETE FROM bookshop_cart
                WHERE id_user = :id_user';
        $this->db->execute($sql, ['id_user' => $userInfo[0]['id']]);
        
        $this->response($orderId);
    }


    /** 
     * Get user id and discount from the table users by hash.
     * Return id and percent or false.
     */
    protected function getUserInfoByHash($hash)
    {
        $sql = 'SELECT bookshop_users.id,
                       bookshop_discounts.percent
                FROM bookshop_users
                    INNER JOIN bookshop_discounts
                    ON bookshop_users.id_discount = bookshop_discounts.id
                WHERE bookshop_users.hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result)
            return FALSE;

        return $result;
    }

    /** 
     * Get data from user cart by id.
     * Return array.
     */
    protected function getUserCartData($id)
    {
        $sql = 'SELECT bookshop_cart.id_book,
                       bookshop_cart.count,
                       bookshop_books.price,
                       bookshop_discounts.percent
                FROM bookshop_cart
                    INNER JOIN bookshop_books
                    ON bookshop_cart.id_book = bookshop_books.id
                    INNER JOIN bookshop_discounts
                    ON bookshop_books.id_discount = bookshop_discounts.id
                WHERE bookshop_cart.id_user = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;
        
        return $result;
    }

    /** 
     * Check id in the table payment.
     * Return bool.
     */
    protected function checkPaymentId($id)
    {
        $sql = 'SELECT id FROM bookshop_payment WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /**
     * Generating the correct data for the response.
     * Return array.
     */
    protected function formingOrders($result)
    {
        $orders = [];
        foreach ($result as $value)
        {
            if ( isset($orders[$value['id']]) )
            {
                    $orders[$value['id']]['books'][] = [
                        'booksName' => $value['booksName'],
                        'bookDiscount' => $value['bookDiscount'],
                        'count' => $value['count'],
                        'bookTotalPrice' => $value['bookTotalPrice']
                    ];
            }
            else
            {
                $orders[$value['id']] = [
                    'id' => $value['id'],
                    'paymentName' => $value['paymentName'],
                    'clientDiscount' => $value['clientDiscount'],
                    'orderTotalPrice' => $value['orderTotalPrice'],
                    'time' => $value['time'],
                    'statusName' => $value['statusName'],
                    'books' => [
                        [
                            'booksName' => $value['booksName'],
                            'bookDiscount' => $value['bookDiscount'],
                            'count' => $value['count'],
                            'bookTotalPrice' => $value['bookTotalPrice']
                        ]
                    ]
                ];
            }
        }

        $orders = array_values($orders);
        return $orders;
    }
}

try
{
    $api = new Orders;
    $api->table = 'orders';
    $api->play();
}
catch (Exception $e)
{
    header( "HTTP/1.1 500 Internal Server Error | " . ERROR_HEADER_CODE . $e->getMessage() );
    header("Content-Type:text/html");

    $string = ERROR_HTML_TEXT;
    ksort( $patterns = ['/%STATUS_CODE%/', '/%ERROR_DESCRIPTION%/', '/%CODE_NUMBER%/'] );
    ksort( $replacements = [500, 'Internal Server Error', ERROR_HEADER_CODE . $e->getMessage()] );
    echo preg_replace($patterns, $replacements, $string);

    exit;
}
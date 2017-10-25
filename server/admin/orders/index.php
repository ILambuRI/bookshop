<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Orders extends Rest
{
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        parent::__construct();
        $this->db = new Db();
    }
    
    /**
     * Receive all orders for admin.
     * /hash(admin) - input.
     * Return array.
     */
    protected function getOrdersByParams()
    {
        if ( !$this->checkAdminRights($this->params['params']) )
            $this->response( '', 406, '033', true );

        $sql = 'SELECT bookshop_orders.id,
                       bookshop_users.login,
                       bookshop_books.booksName,
                       bookshop_info_order.bookDiscount,
                       bookshop_info_order.count,
                       bookshop_info_order.bookTotalPrice,
                       bookshop_orders.clientDiscount,
                       bookshop_payment.paymentName,
                       bookshop_orders.time,
                       bookshop_status.id AS statusId,
                       bookshop_status.statusName,
                       bookshop_orders.orderTotalPrice
                FROM bookshop_info_order
                INNER JOIN bookshop_orders
                    ON bookshop_info_order.id_order = bookshop_orders.id
                INNER JOIN bookshop_payment
                    ON bookshop_orders.id_payment = bookshop_payment.id
                INNER JOIN bookshop_status
                    ON bookshop_orders.id_status = bookshop_status.id
                INNER JOIN bookshop_users
                    ON bookshop_orders.id_user = bookshop_users.id
                INNER JOIN bookshop_books
                    ON bookshop_info_order.id_book = bookshop_books.id';

        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $orders = $this->formingOrders($result);
        $this->response($orders);
    }

    /**
     * Set a new status for the order.
     * hash(admin) | idOrder | idStatus - input.
     * Return 200 or 400+.
     */
    protected function putOrders()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
        
        if ( !$this->checkOrdersId($this->params['idOrder']) )
            $this->response( '', 404, '046', true );
        
        if ( !$this->checkStatusId($this->params['idStatus']) )
            $this->response( '', 404, '047', true );
        
        unset($this->params['hash']);

        $sql = 'UPDATE bookshop_orders
                SET id_status = :idStatus
                WHERE id = :idOrder';
        $result = $this->db->execute($sql, $this->params);
        
        if (!$result)
            $this->response( '', 404, '002', true );
        
        $this->response();
    }

    /** 
     * Check id in the table status
     * Return bool
     */
    protected function checkStatusId($id)
    {
        $sql = 'SELECT id FROM bookshop_status WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table orders
     * Return bool
     */
    protected function checkOrdersId($id)
    {
        $sql = 'SELECT id FROM bookshop_orders WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Checking user access by hash.
     * Return bool.
     */
    protected function checkAdminRights($hash)
    {
        $sql = 'SELECT admin FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result or $result[0]['admin'] == 0)
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
                    'login' => $value['login'],
                    'paymentName' => $value['paymentName'],
                    'clientDiscount' => $value['clientDiscount'],
                    'orderTotalPrice' => $value['orderTotalPrice'],
                    'time' => $value['time'],
                    'statusId' => $value['statusId'],
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
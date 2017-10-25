<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;
use lib\services\Validate;
use lib\services\Convert;

class Cart extends Rest
{
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        parent::__construct();
        $this->db = new Db();
    }
    
    /**
     * /hash - getting all the books from the cart by user hash.
     * Return array.
     */
    protected function getCartByParams()
    {
        if ( !$id = $this->getUserIdByHash($this->params['params']) )
            $this->response( '', 404, '015', true );
        
        $sql = 'SELECT bookshop_books.id,
                       bookshop_books.booksName,
                       bookshop_cart.count,
                       bookshop_books.price,
                       bookshop_discounts.percent
                FROM bookshop_cart
                    INNER JOIN bookshop_books
                        ON bookshop_cart.id_book = bookshop_books.id
                    INNER JOIN bookshop_discounts
                        ON bookshop_books.id_discount = bookshop_discounts.id
                WHERE bookshop_cart.id_user = :id';
        $result = $this->db->execute($sql, ['id' => $id[0]['id']]);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }

    /**
     * Adding a book to the cart.
     * hash | id(books) | count - input.
     * Return 200 or 400+.
     */
    protected function postCart()
    {
        if ( !$id = $this->getUserIdByHash($this->params['hash']) )
            $this->response( '', 404, '016', true );

        if ( !$this->checkBookId($this->params['id']) )
            $this->response( '', 404, '017', true );
            
        if ( !Validate::onlyNumbers($this->params['count']) )
            $this->response( '', 406, '018', true );
        
        if ( $this->checkBookInCart($id[0]['id'], $this->params['id']) )
            $this->response( '', 406, '019', true );
            
        $arrParams['id_user'] = $id[0]['id'];
        $arrParams['id_book'] = $this->params['id'];
        $arrParams['count'] = $this->params['count'];

        $sql = 'INSERT INTO bookshop_cart (id_user, id_book, count)
                VALUES (:id_user, :id_book, :count)';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Changing the number of books in the cart.
     * hash | id(books) | count - input.
     * Return 200 or 400+.
     */
    protected function putCart()
    {
        if ( !$id = $this->getUserIdByHash($this->params['hash']) )
            $this->response( '', 404, '020', true );
            
        if ( !Validate::onlyNumbers($this->params['id']) )
            $this->response( '', 406, '021', true );
            
        if ( !Validate::onlyNumbers($this->params['count']) )
            $this->response( '', 406, '022', true );
        
        if ( !$this->checkBookInCart($id[0]['id'], $this->params['id']) )
            $this->response( '', 404, '023', true );
            
        $arrParams['id_user'] = $id[0]['id'];
        $arrParams['id_book'] = $this->params['id'];
        $arrParams['count'] = $this->params['count'];
    
        $sql = 'UPDATE bookshop_cart
                SET count = :count
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Removing a book from a cart.
     * /hash/id(books) - input.
     * Return 200 or 400+.
     */
    protected function deleteCart()
    {
        list($arrParams['id_user'],
             $arrParams['id_book']
        ) = explode('/', $this->params['params'], 3);

        if ( !$id = $this->getUserIdByHash($arrParams['id_user']) )
            $this->response( '', 404, '024', true );
            
        if ( !Validate::onlyNumbers($arrParams['id_book']) )
            $this->response( '', 406, '026', true );

        if ( !$this->checkBookInCart($id[0]['id'], $arrParams['id_book']) )
            $this->response( '', 404, '025', true );
        
        $arrParams['id_user'] = $id[0]['id'];
        $sql = 'DELETE FROM bookshop_cart
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, $arrParams);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /** 
     * Check book id in user cart.
     * Return bool
     */
    protected function checkBookInCart($userId, $bookId)
    {
        $sql = 'SELECT id_book FROM bookshop_cart
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, ['id_book' => $bookId, 'id_user'=> $userId]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table books
     * Return bool
     */
    protected function checkBookId($id)
    {
        $sql = 'SELECT id FROM bookshop_books WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Get user id from the table users by hash
     * Return id or false
     */
    protected function getUserIdByHash($hash)
    {
        $sql = 'SELECT id FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result)
            return FALSE;

        return $result;
    }
}

try
{
    $api = new Cart;
    $api->table = 'cart';
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
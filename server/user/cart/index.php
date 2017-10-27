<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class Cart
{
    use Error;
    
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * /hash - getting all the books from the cart by user hash.
     * Return array.
     */
    public function getCartByParams($params)
    {
        if ( !$id = $this->getUserIdByHash($params['params']) )
            return $this->error(404, 15);
        
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
            return $this->error();

        return $result;
    }

    /**
     * Adding a book to the cart.
     * hash | id(books) | count - input.
     * Return 200 or 400+.
     */
    public function postCart($params)
    {
        if ( !$id = $this->getUserIdByHash($params['hash']) )
            return $this->error(404, 16);

        if ( !$this->checkBookId($params['id']) )
            return $this->error(404, 17);
        
        if ( !Validate::onlyNumbers($params['count']) )
            return $this->error(406, 18);
        
        if ( $this->checkBookInCart($id[0]['id'], $params['id']) )
            return $this->error(404, 19);
            
        $arrParams['id_user'] = $id[0]['id'];
        $arrParams['id_book'] = $params['id'];
        $arrParams['count'] = $params['count'];

        $sql = 'INSERT INTO bookshop_cart (id_user, id_book, count)
                VALUES (:id_user, :id_book, :count)';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Changing the number of books in the cart.
     * hash | id(books) | count - input.
     * Return 200 or 400+.
     */
    public function putCart($params)
    {
        if ( !$id = $this->getUserIdByHash($params['hash']) )
            return $this->error(404, 20);
            
        if ( !Validate::onlyNumbers($params['id']) )
            return $this->error(406, 21);
            
        if ( !Validate::onlyNumbers($params['count']) )
            return $this->error(406, 22);
        
        if ( !$this->checkBookInCart($id[0]['id'], $params['id']) )
            return $this->error(404, 23);
            
        $arrParams['id_user'] = $id[0]['id'];
        $arrParams['id_book'] = $params['id'];
        $arrParams['count'] = $params['count'];
    
        $sql = 'UPDATE bookshop_cart
                SET count = :count
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Removing a book from a cart.
     * /hash/id(books) - input.
     * Return 200 or 400+.
     */
    public function deleteCart($params)
    {
        list($arrParams['id_user'],
             $arrParams['id_book']
        ) = explode('/', $params['params'], 3);

        if ( !$id = $this->getUserIdByHash($arrParams['id_user']) )
            return $this->error(404, 24);
            
        if ( !Validate::onlyNumbers($arrParams['id_book']) )
            return $this->error(406, 26);

        if ( !$this->checkBookInCart($id[0]['id'], $arrParams['id_book']) )
            return $this->error(404, 25);
        
        $arrParams['id_user'] = $id[0]['id'];
        $sql = 'DELETE FROM bookshop_cart
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, $arrParams);
        
        if (!$result)
            return $this->error();

        return TRUE;
    }

    /** 
     * Check book id in user cart.
     * Return bool
     */
    private function checkBookInCart($userId, $bookId)
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
    private function checkBookId($id)
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
    private function getUserIdByHash($hash)
    {
        $sql = 'SELECT id FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result)
            return FALSE;

        return $result;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new Cart );
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
}
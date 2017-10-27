<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class AdminBooks
{
    use Error;
    
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }

    /**
     * Adding a new book to the table.
     * hash(admin) | name(books) | description | pubyear(int) | price(int) | idDiscount
     * authorsId(1,2,3 etc.) | genresId(1,2,3 etc.) - input.
     * Return 200 or 400+.
     */
    public function postBooks($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
        
        if ( !$this->checkDiscountId($params['idDiscount']) )
            return $this->error(404, 64);

        if ( !Validate::onlyNumbers($params['pubyear']) || strlen($params['pubyear']) > 4 )
            return $this->error(406, 65);

        if ( !Validate::onlyNumbers($params['price']) || strlen($params['pubyear']) > 10 )
            return $this->error(406, 66);

        if ( !$params['name'] = Validate::clearText($params['name']) )
            return $this->error(406, 67);

        if (strlen($params['name']) > 100)
            return $this->error(406, 67);

        if( !$params['description'] = Validate::clearText($params['description']) )
            return $this->error(406, 68);
        
        /* Parameters for the books and authors links table */
        $transactionParams[1]['sql'] = 'INSERT INTO bookshop_books_to_authors (id_book, id_author)
                                        VALUES (:lastId, :id)';

        $authorsId = explode(',', $params['authorsId']);
        foreach ($authorsId as $id)
        {
            if ( !$this->checkAuthorsId($id) )
                return $this->error(404, 69);

            $transactionParams[1]['params'][] = ['id' => $id];
        }

        /* Parameters for the books and genres links table */
        $transactionParams[2]['sql'] = 'INSERT INTO bookshop_books_to_genres (id_book, id_genre)
                                        VALUES (:lastId, :id)';

        $genresId = explode(',', $params['genresId']);
        foreach ($genresId as $id)
        {
            if ( !$this->checkGenresId($id) )
                return $this->error(404, 70);

            $transactionParams[2]['params'][] = ['id' => $id];                
        }

        unset($params['hash'],
              $params['authorsId'],
              $params['genresId'],
              $authorsId,
              $genresId              
        );

        /* Parameters for the book */
        $transactionParams[0]['sql'] = 'INSERT INTO bookshop_books (booksName, description, pubyear, price, id_discount)
                                        VALUES (:name, :description, :pubyear, :price, :idDiscount)';

        $transactionParams[0]['params'] = $params;

        $result = $this->db->execTransaction($transactionParams, true);

        if (!$result)
            return $this->error(404, 72);

        return TRUE;
    }


    /**
     * Update book in the table.
     * hash(admin) | id(book) | name(books) | description | pubyear(int) | price(int) | idDiscount
     * authorsId(1,2,3 etc.) | genresId(1,2,3 etc.) - input.
     * Return 200 or 400+.
     */
    public function putBooks($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
        
        if ( !$this->checkBooksId($params['id']) )
            return $this->error(404, 73);

        if ( !$this->checkDiscountId($params['idDiscount']) )
            return $this->error(404, 74);

        if ( !Validate::onlyNumbers($params['pubyear']) )
            return $this->error(406, 75);

        if ( !Validate::onlyNumbers($params['price']) )
            return $this->error(406, 76);

        if ( !$params['name'] = Validate::clearText($params['name']) )
            return $this->error(406, 77);

        if (strlen($params['name']) > 100)
            return $this->error(406, 77);

        if( !$params['description'] = Validate::clearText($params['description']) )
            return $this->error(406, 78);
        
        /* Parameters for the books and authors links table */
        $transactionParams[1]['sql'] = 'INSERT INTO bookshop_books_to_authors (id_book, id_author)
                                        VALUES (' .$params['id']. ', :id)';

        $authorsId = explode(',', $params['authorsId']);
        foreach ($authorsId as $id)
        {
            if ( !$this->checkAuthorsId($id) )
                return $this->error(404, 79);

                $transactionParams[1]['params'][] = ['id' => $id];
        }

        /* Parameters for the books and genres links table */
        $transactionParams[2]['sql'] = 'INSERT INTO bookshop_books_to_genres (id_book, id_genre)
                                        VALUES (' .$params['id']. ', :id)';
    
        $genresId = explode(',', $params['genresId']);
        foreach ($genresId as $id)
        {
            if ( !$this->checkGenresId($id) )
                return $this->error(404, 80);
                
                $transactionParams[2]['params'][] = ['id' => $id];                
        }

        unset($params['hash'],
              $params['authorsId'],
              $params['genresId'],
              $authorsId,
              $genresId              
        );

        /* Parameters for the book */
        $transactionParams[0]['sql'] = 'UPDATE bookshop_books
                                        SET booksName = :name,
                                            description = :description,
                                            pubyear = :pubyear,
                                            price = :price,
                                            id_discount = :idDiscount
                                        WHERE id = :id';

        $transactionParams[0]['params'] = $params;
        
        $sql = 'DELETE FROM bookshop_books_to_authors
                WHERE id_book = ' . $params['id'];
        $result = $this->db->execute($sql);

        $sql = 'DELETE FROM bookshop_books_to_genres
                WHERE id_book = ' . $params['id'];
        $result = $this->db->execute($sql);
        
        $result = $this->db->execTransaction($transactionParams);

        if (!$result)
            return $this->error(404, 82);
        
        return TRUE;
    }

    /** 
     * Check id in the table discounts.
     * Return bool.
     */
    private function checkDiscountId($id)
    {
        $sql = 'SELECT id FROM bookshop_discounts WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table books
     * Return bool
     */
    private function checkBooksId($id)
    {
        $sql = 'SELECT id FROM bookshop_books WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table genres
     * Return bool
     */
    private function checkGenresId($id)
    {
        $sql = 'SELECT id FROM bookshop_genres WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }
    
    /** 
     * Check id in the table authors
     * Return bool
     */
    private function checkAuthorsId($id)
    {
        $sql = 'SELECT id FROM bookshop_authors WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }
    
    /** 
     * Checking user access by hash.
     * Return bool.
     */
    private function checkAdminRights($hash)
    {
        $sql = 'SELECT admin FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result or $result[0]['admin'] == 0)
            return FALSE;

        return TRUE;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new AdminBooks );
        $api->table = 'books';
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
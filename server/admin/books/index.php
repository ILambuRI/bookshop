<?php
require_once("../../config.php");
require_once("../Db.php");

use services\Validate;
use services\Convert;

class Books extends Rest
{
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
     * Return id(new book) or 400+.
     */
    protected function postBooks()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
        
        if ( !$this->checkDiscountId($this->params['idDiscount']) )
            $this->response( '', 404, '064', true );

        if ( !Validate::onlyNumbers($this->params['pubyear']) )
            $this->response( '', 406, '065', true );

        if ( !Validate::onlyNumbers($this->params['price']) )
            $this->response( '', 406, '066', true );

        if ( !$this->params['name'] = Validate::clearText($this->params['name']) )
            $this->response( '', 406, '067', true );

        if( !$this->params['description'] = Validate::clearText($this->params['description']) )
            $this->response( '', 406, '068', true );

        $authorsId = explode(',', $this->params['authorsId']);
        foreach ($authorsId as $id)
        {
            if ( !$this->checkAuthorsId($id) )
                $this->response( '', 404, '069', true );

            $authorsIdParams[] = ['id' => $id];
        }
    
        $genresId = explode(',', $this->params['genresId']);
        foreach ($genresId as $id)
        {
            if ( !$this->checkGenresId($id) )
                $this->response( '', 404, '070', true );

            $genresIdParams[] = ['id' => $id];                
        }

        unset($this->params['hash'],
              $this->params['authorsId'],
              $this->params['genresId'],
              $authorsId,
              $genresId              
        );
        
        $sql = 'INSERT INTO bookshop_books (booksName, description, pubyear, price, id_discount)
                VALUES (:name, :description, :pubyear, :price, :idDiscount)';
        $result = $this->db->execute($sql, $this->params);
        
        if (!$result)
            $this->response( '', 404, '002', true );
        
        /* Get the ID of the inserted book */
        $bookId = $this->db->dbh->lastInsertId();

        // foreach ($authorsId as $id)
        // {
        //     $sql = 'INSERT INTO bookshop_books_to_authors (id_book, id_author)
        //             VALUES (' .$bookId. ', ' .$id. ')';
        //     $this->db->execute($sql);
        // }

        // foreach ($genresId as $id)
        // {
        //     $sql = 'INSERT INTO bookshop_books_to_genres (id_book, id_genre)
        //             VALUES (' .$bookId. ', ' .$id. ')';
        //     $this->db->execute($sql);
        // }

        $sql = 'INSERT INTO bookshop_books_to_authors (id_book, id_author)
                VALUES (' .$bookId. ', :id)';
        $result = $this->db->execTransaction($sql, $authorsIdParams);
        
        if (!$result)
            $this->response( '', 404, '071', true );
    
        $sql = 'INSERT INTO bookshop_books_to_genres (id_book, id_genre)
                VALUES (' .$bookId. ', :id)';
        $result = $this->db->execTransaction($sql, $genresIdParams);

        if (!$result)
            $this->response( '', 404, '072', true );
        
        $this->response( [$bookId] );
    }


    /**
     * Update book in the table.
     * hash(admin) | id(book) | name(books) | description | pubyear(int) | price(int) | idDiscount
     * authorsId(1,2,3 etc.) | genresId(1,2,3 etc.) - input.
     * Return 200 or 400+.
     */
    protected function putBooks()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
        
        if ( !$this->checkBooksId($this->params['id']) )
            $this->response( '', 404, '064', true );

        if ( !$this->checkDiscountId($this->params['idDiscount']) )
            $this->response( '', 404, '064', true );

        if ( !Validate::onlyNumbers($this->params['pubyear']) )
            $this->response( '', 406, '065', true );

        if ( !Validate::onlyNumbers($this->params['price']) )
            $this->response( '', 406, '066', true );

        if ( !$this->params['name'] = Validate::clearText($this->params['name']) )
            $this->response( '', 406, '067', true );

        if( !$this->params['description'] = Validate::clearText($this->params['description']) )
            $this->response( '', 406, '068', true );

        $authorsId = explode(',', $this->params['authorsId']);
        foreach ($authorsId as $id)
        {
            if ( !$this->checkAuthorsId($id) )
                $this->response( '', 404, '069', true );

            $authorsIdParams[] = ['id' => $id];
        }
    
        $genresId = explode(',', $this->params['genresId']);
        foreach ($genresId as $id)
        {
            if ( !$this->checkGenresId($id) )
                $this->response( '', 404, '070', true );
                
            $genresIdParams[] = ['id' => $id];                
        }

        unset($this->params['hash'],
              $this->params['authorsId'],
              $this->params['genresId'],
              $authorsId,
              $genresId              
        );
        
        $sql = 'UPDATE bookshop_books
                SET booksName = :name,
                    description = :description,
                    pubyear = :pubyear,
                    price = :price,
                    id_discount = :idDiscount
                WHERE id = :id';
        $result = $this->db->execute($sql, $this->params);
        
        $sql = 'DELETE FROM bookshop_books_to_authors
                WHERE id_book = ' . $this->params['id'];
        $result = $this->db->execute($sql);

        $sql = 'DELETE FROM bookshop_books_to_genres
                WHERE id_book = ' . $this->params['id'];
        $result = $this->db->execute($sql);

        $sql = 'INSERT INTO bookshop_books_to_authors (id_book, id_author)
                VALUES (' .$this->params['id']. ', :id)';
        $result = $this->db->execTransaction($sql, $authorsIdParams);
        
        if (!$result)
            $this->response( '', 404, '071', true );
    
        $sql = 'INSERT INTO bookshop_books_to_genres (id_book, id_genre)
                VALUES (' .$this->params['id']. ', :id)';
        $result = $this->db->execTransaction($sql, $genresIdParams);

        if (!$result)
            $this->response( '', 404, '072', true );
        
        $this->response();
    }

    /** 
     * Check id in the table discounts.
     * Return bool.
     */
    protected function checkDiscountId($id)
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
    protected function checkBooksId($id)
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
    protected function checkGenresId($id)
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
    protected function checkAuthorsId($id)
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
    protected function checkAdminRights($hash)
    {
        $sql = 'SELECT admin FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result or $result[0]['admin'] == 0)
            return FALSE;

        return TRUE;
    }
}

try
{
    $api = new Books;
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
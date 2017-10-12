<?php
require_once("../../config.php");
require_once("../Db.php");

class Books extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of books
     * Return array
     */
    protected function getBooks()
    {
        $sql = 'SELECT bookshop_books.id,
                       bookshop_books.booksName,
                       bookshop_authors.authorsName,
                       bookshop_genres.genresName,
                       bookshop_books.description,
                       bookshop_books.pubyear,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent,
                       bookshop_books.price
                FROM bookshop_books_to_authors
                INNER JOIN bookshop_books
                    ON bookshop_books_to_authors.id_book = bookshop_books.id
                INNER JOIN bookshop_authors
                    ON bookshop_books_to_authors.id_author = bookshop_authors.id
                INNER JOIN bookshop_discounts
                    ON bookshop_books.id_discount = bookshop_discounts.id
                INNER JOIN bookshop_books_to_genres
                    ON bookshop_books_to_genres.id_book = bookshop_books.id
                INNER JOIN bookshop_genres
                    ON bookshop_books_to_genres.id_genre = bookshop_genres.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
    
    /**
     * Get full information about the book by id.
     * /id - input.
     * Return array
     */
    protected function getBooksByParams()
    {
        $id = $this->params['params'];
        
        $sql = 'SELECT bookshop_books.id,
                       bookshop_books.booksName,
                       bookshop_authors.authorsName,
                       bookshop_genres.genresName,
                       bookshop_books.description,
                       bookshop_books.pubyear,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent,
                       bookshop_books.price
                FROM bookshop_books_to_authors
                INNER JOIN bookshop_books
                    ON bookshop_books_to_authors.id_book = bookshop_books.id
                INNER JOIN bookshop_authors
                    ON bookshop_books_to_authors.id_author = bookshop_authors.id
                INNER JOIN bookshop_discounts
                    ON bookshop_books.id_discount = bookshop_discounts.id
                INNER JOIN bookshop_books_to_genres
                    ON bookshop_books_to_genres.id_book = bookshop_books.id
                INNER JOIN bookshop_genres
                    ON bookshop_books_to_genres.id_genre = bookshop_genres.id
                WHERE bookshop_books.id = :id';

        $result = $this->db->execute($sql, ['id' => $id]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
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
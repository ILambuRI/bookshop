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

        $books = $this->formingBooks($result);
        $this->response($books);
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

        $books = $this->formingBooks($result);
        $this->response($books);
    }

    protected function formingBooks($result)
    {
        $books = [];
        foreach ($result as $value)
        {
            if ( isset($books[$value['id']]) )
            {
                $regAuthor = preg_match('/' .$value['authorsName']. '/', $books[$value['id']]['authorsName']);
                if ( ($books[$value['id']]['authorsName'] != $value['authorsName']) && !$regAuthor )
                    $books[$value['id']]['authorsName'] .= ', ' . $value['authorsName'];

                $regGenre = preg_match('/' .$value['genresName']. '/', $books[$value['id']]['genresName']);
                if ( $books[$value['id']]['genresName'] != $value['genresName'] && !$regGenre )
                    $books[$value['id']]['genresName'] .= ', ' . $value['genresName'];
            }
            else
            {
                $books[$value['id']] = [
                    'id' => $value['id'],
                    'booksName' => $value['booksName'],
                    'authorsName' => $value['authorsName'],
                    'genresName' => $value['genresName'],
                    'description' => $value['description'],
                    'pubyear' => $value['pubyear'],
                    'discountsName' => $value['discountsName'],
                    'percent' => $value['percent'],
                    'price' => $value['price']
                ];
            }
        }

        $books = array_values($books);
        return $books;
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
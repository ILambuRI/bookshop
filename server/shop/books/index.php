<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;

class Books
{
    use Error;

    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of books.
     * Return array.
     */
    public function getBooks()
    {
        $sql = 'SELECT bookshop_books.id,
                       bookshop_books.description,
                       bookshop_books.booksName,
                       bookshop_books.pubyear,
                       bookshop_discounts.id AS discountsId,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent,
                       bookshop_books.price,
                       bookshop_authors.id AS idAuthors,
                       bookshop_authors.authorsName,
                       bookshop_genres.id AS idGenres,
                       bookshop_genres.genresName
                FROM bookshop_books_to_authors
                INNER JOIN bookshop_books
                    ON bookshop_books_to_authors.id_book = bookshop_books.id
                INNER JOIN bookshop_books_to_genres
                    ON bookshop_books_to_genres.id_book = bookshop_books.id
                INNER JOIN bookshop_authors
                    ON bookshop_books_to_authors.id_author = bookshop_authors.id
                INNER JOIN bookshop_genres
                    ON bookshop_books_to_genres.id_genre = bookshop_genres.id
                INNER JOIN bookshop_discounts
                    ON bookshop_books.id_discount = bookshop_discounts.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            return $this->error();

        return $this->formingBooks($result);
    }
    
    /**
     * Get full information about the books where:
     * /id(books).
     * /false(null)/id(authors).
     * /false(null)/false(null)/id(genres).
     * Return array.
     */
    public function getBooksByParams($params)
    {
        list($arrParams['idBooks'],
             $arrParams['idAuthors'],
             $arrParams['idGenres']
        ) = explode('/', $params['params'], 4);

        $sql = 'SELECT bookshop_books.id,
                       bookshop_books.description,
                       bookshop_books.booksName,
                       bookshop_books.pubyear,
                       bookshop_discounts.id AS discountsId,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent,
                       bookshop_books.price,
                       bookshop_authors.id AS idAuthors,
                       bookshop_authors.authorsName,
                       bookshop_genres.id AS idGenres,
                       bookshop_genres.genresName
                FROM bookshop_books_to_authors
                INNER JOIN bookshop_books
                    ON bookshop_books_to_authors.id_book = bookshop_books.id
                INNER JOIN bookshop_books_to_genres
                    ON bookshop_books_to_genres.id_book = bookshop_books.id
                INNER JOIN bookshop_authors
                    ON bookshop_books_to_authors.id_author = bookshop_authors.id
                INNER JOIN bookshop_genres
                    ON bookshop_books_to_genres.id_genre = bookshop_genres.id
                INNER JOIN bookshop_discounts
                    ON bookshop_books.id_discount = bookshop_discounts.id';

        if ( !$condition = $this->conditionSwitch($sql, $arrParams) )
            return $this->error(404, 63);

        $result = $this->db->execute($condition['sql'], ['id' => $condition['id']]);

        if (!$result)
            return $this->error();

        return $this->formingBooks($result);
    }

    private function formingBooks($result)
    {
        $books = [];
        foreach ($result as $value)
        {
            if ( isset($books[$value['id']]) )
            {
                if ( !array_key_exists($value['idAuthors'], $books[$value['id']]['authors']) )
                {
                    $books[$value['id']]['authors'][$value['idAuthors']] = [
                        'id' => $value['idAuthors'],
                        'authorsName' => $value['authorsName']
                    ];
                }
                if ( !array_key_exists($value['idGenres'], $books[$value['id']]['genres']) )
                {
                    $books[$value['id']]['genres'][$value['idGenres']] = [
                        'id' => $value['idGenres'],
                        'genresName' => $value['genresName']
                    ];
                }
            }
            else
            {
                $books[$value['id']] = [
                    'id' => $value['id'],
                    'booksName' => $value['booksName'],
                    'description' => $value['description'],
                    'pubyear' => $value['pubyear'],
                    'discountsId' => $value['discountsId'],
                    'discountsName' => $value['discountsName'],
                    'percent' => $value['percent'],
                    'price' => $value['price'],

                    'authors' => [
                        $value['idAuthors'] => [
                            'id' => $value['idAuthors'],
                            'authorsName' => $value['authorsName']
                        ]
                    ],

                    'genres' => [
                        $value['idGenres'] => [
                            'id' => $value['idGenres'],
                            'genresName' => $value['genresName']
                        ]
                    ]
                ];
            }
        }

        $books = array_values($books);
        return $books;
    }

    private function conditionSwitch($sql, $arrParams)
    {
        if ( (int)$arrParams['idBooks'] )
        {
            $sql .= ' WHERE bookshop_books.id = :id';
            $id = $arrParams['idBooks'];
            return ['sql' => $sql, 'id' => $id];            
        }

        if ( (int)$arrParams['idAuthors'] )
        {
            $sql .= ' WHERE bookshop_authors.id = :id';
            $id = $arrParams['idAuthors'];
            return ['sql' => $sql, 'id' => $id];            
        }

        if ( (int)$arrParams['idGenres'] )
        {
            $sql .= ' WHERE bookshop_genres.id = :id';
            $id = $arrParams['idGenres'];
            return ['sql' => $sql, 'id' => $id];            
        }
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new Books );
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

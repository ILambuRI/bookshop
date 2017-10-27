<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;

class Genres
{
    use Error;

    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of genres.
     * Delete 0 ID (Empty) from the result.
     * Return array grouped by id.
     */
    public function getGenres()
    {
        $sql = 'SELECT bookshop_genres.id,
                       bookshop_genres.genresName
                FROM bookshop_genres
                GROUP BY bookshop_genres.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            return $this->error();
        
        array_splice($result, 0, 1);

        return $result;
    }
    
    /**
     * Get full information about the genre by id.
     * /id - input.
     * Return array.
     */
    public function getGenresByParams($params)
    {
        $id = $params['params'];

        if (!(int)$id || $id == '0')
            return $this->error();
        
        $sql = 'SELECT bookshop_genres.id,
                       bookshop_genres.genresName
                FROM bookshop_genres
                WHERE bookshop_genres.id = :id
                LIMIT 1';

        $result = $this->db->execute($sql, ['id' => $id]);

        if (!$result)
            return $this->error();

        return $result;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new Genres );
        $api->table = 'genres';
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
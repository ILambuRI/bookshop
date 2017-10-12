<?php
require_once("../../config.php");
require_once("../Db.php");

class Genres extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of genres
     * Return array grouped by id
     */
    protected function getGenres()
    {
        $sql = 'SELECT bookshop_genres.id,
                       bookshop_genres.genresName
                FROM bookshop_genres
                GROUP BY bookshop_genres.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
    
    /**
     * Get full information about the genre by id.
     * /id - input.
     * Return array
     */
    protected function getGenresByParams()
    {
        $id = $this->params['params'];
        
        $sql = 'SELECT bookshop_genres.id,
                       bookshop_genres.genresName
                FROM bookshop_genres
                WHERE bookshop_genres.id = :id
                LIMIT 1';

        $result = $this->db->execute($sql, ['id' => $id]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
}

try
{
    $api = new Genres;
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
<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;

class Authors
{
    use Error;

    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of authors.
     * Delete 0 ID (Empty) from the result.
     * Return array grouped by id.
     */
    public function getAuthors()
    {
        $sql = 'SELECT bookshop_authors.id,
                       bookshop_authors.authorsName
                FROM bookshop_authors
                GROUP BY bookshop_authors.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            return $this->error();

        array_splice($result, 0, 1);

        return $result;
    }
    
    /**
     * Get full information about the author by id.
     * /id - input.
     * Return array.
     */
    public function getAuthorsByParams($params)
    {
        $id = $params['params'];

        if (!(int)$id || $id == '0')
            return $this->error();
        
        $sql = 'SELECT bookshop_authors.id,
                       bookshop_authors.authorsName
                FROM bookshop_authors
                WHERE bookshop_authors.id = :id
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
        $api = new Rest( new Authors );
        $api->table = 'authors';
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

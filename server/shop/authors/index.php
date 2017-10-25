<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Authors extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of authors.
     * Delete 0 ID (Empty) from the result.
     * Return array grouped by id.
     */
    protected function getAuthors()
    {
        $sql = 'SELECT bookshop_authors.id,
                       bookshop_authors.authorsName
                FROM bookshop_authors
                GROUP BY bookshop_authors.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        array_splice($result, 0, 1);

        $this->response($result);
    }
    
    /**
     * Get full information about the author by id.
     * /id - input.
     * Return array.
     */
    protected function getAuthorsByParams()
    {
        $id = $this->params['params'];
        if ($id == '0')
            $this->response( '', 404, '002', true );
        
        $sql = 'SELECT bookshop_authors.id,
                       bookshop_authors.authorsName
                FROM bookshop_authors
                WHERE bookshop_authors.id = :id
                LIMIT 1';

        $result = $this->db->execute($sql, ['id' => $id]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
}

try
{
    $api = new Authors;
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

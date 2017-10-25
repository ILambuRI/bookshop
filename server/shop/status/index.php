<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Status extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of status
     * Return array grouped by id
     */
    protected function getStatus()
    {
        $sql = 'SELECT bookshop_status.id,
                       bookshop_status.statusName
                FROM bookshop_status
                GROUP BY bookshop_status.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
}

try
{
    $api = new Status;
    $api->table = 'status';
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
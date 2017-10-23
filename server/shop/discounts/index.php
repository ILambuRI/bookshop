<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Discounts extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of discounts
     * Return array grouped by id
     */
    protected function getDiscounts()
    {
        $sql = 'SELECT bookshop_discounts.id,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent
                FROM bookshop_discounts
                GROUP BY bookshop_discounts.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
}

try
{
    $api = new Discounts;
    $api->table = 'discounts';
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
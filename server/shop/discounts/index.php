<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;

class Discounts
{
    use Error;

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
    public function getDiscounts()
    {
        $sql = 'SELECT bookshop_discounts.id,
                       bookshop_discounts.discountsName,
                       bookshop_discounts.percent
                FROM bookshop_discounts
                GROUP BY bookshop_discounts.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            return $this->error();

        return $result;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new Discounts );
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
}
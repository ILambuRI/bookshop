<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;

class Payment
{
    use Error;

    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of payment
     * Return array grouped by id
     */
    public function getPayment()
    {
        $sql = 'SELECT bookshop_payment.id,
                       bookshop_payment.paymentName
                FROM bookshop_payment
                GROUP BY bookshop_payment.id';
        
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
        $api = new Rest ( new Payment );
        $api->table = 'payment';
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
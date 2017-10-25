<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;

class Payment extends Rest
{
    /**Database object (PDO)*/
    private $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = new Db();
    }
    
    /**
     * Get the whole table of payment
     * Return array grouped by id
     */
    protected function getPayment()
    {
        $sql = 'SELECT bookshop_payment.id,
                       bookshop_payment.paymentName
                FROM bookshop_payment
                GROUP BY bookshop_payment.id';
        
        $result = $this->db->execute($sql);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }
}

try
{
    $api = new Payment;
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
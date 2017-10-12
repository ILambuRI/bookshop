<?php
require_once("../../config.php");
require_once("../Db.php");

use services\Validate;
use services\Convert;

class Authors extends Rest
{
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }

    /**
     * Add author to table.
     * hash(admin) | name(author) - input.
     * Return 200 or 400+.
     */
    protected function postAuthors()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
            
        if ( !Validate::checkName($this->params['name']) )
            $this->response( '', 406, '034', true );

        $sql = 'INSERT INTO bookshop_authors (authorsName)
                VALUES (:authorsName)';
        $result = $this->db->execute($sql, ['authorsName' => $this->params['name']]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Change of author's name.
     * hash(admin) | id(authors) | name(new author) - input.
     * Return 200 or 400+.
     */
    protected function putAuthors()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
        
        if ( !$this->checkAuthorsId($this->params['id']) )
            $this->response( '', 404, '035', true );
            
        if ( !Validate::checkName($this->params['name']) )
            $this->response( '', 406, '036', true );

        $arrParams['id'] = $this->params['id'];
        $arrParams['authorsName'] = $this->params['name'];
    
        $sql = 'UPDATE bookshop_authors
                SET authorsName = :authorsName
                WHERE id = :id';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Removing an author from a table.
     * /hash(admin)/id(author) - input.
     * Return 200 or 400+.
     */
    protected function deleteAuthors()
    {
        list($arrParams['hash'],
             $arrParams['id']
        ) = explode('/', $this->params['params'], 3);

        if ( !$id = $this->getUserIdByHash($arrParams['id_user']) )
            $this->response( '', 404, '024', true );
            
        if ( !Validate::onlyNumbers($arrParams['id_book']) )
            $this->response( '', 406, '026', true );

        if ( !$this->checkBookInCart($id[0]['id'], $arrParams['id_book']) )
            $this->response( '', 404, '025', true );
        
        $arrParams['id_user'] = $id[0]['id'];
        $sql = 'DELETE FROM bookshop_cart
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, $arrParams);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /** 
     * Check book id in user cart.
     * Return bool
     */
    protected function checkBookInCart($userId, $bookId)
    {
        $sql = 'SELECT id_book FROM bookshop_cart
                WHERE id_user = :id_user
                AND id_book = :id_book';
        $result = $this->db->execute($sql, ['id_book' => $bookId, 'id_user'=> $userId]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table authors
     * Return bool
     */
    protected function checkAuthorsId($id)
    {
        $sql = 'SELECT id FROM bookshop_authors WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Checking user access by hash.
     * Return bool.
     */
    protected function checkAdminRights($hash)
    {
        $sql = 'SELECT admin FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result or $result[0]['admin'] == 0)
            return FALSE;

        return TRUE;
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

<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class AdminAuthors
{
    use Error;
    
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
    public function postAuthors($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
            
        if ( !Validate::checkName($params['name']) )
            return $this->error(406, 34);

        if ( $this->checkAuthorsName($params['name']) )
            return $this->error(406, 38);

        $sql = 'INSERT INTO bookshop_authors (authorsName)
                VALUES (:authorsName)';
        $result = $this->db->execute($sql, ['authorsName' => $params['name']]);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Change of author's name.
     * hash(admin) | id(authors) | name(new author) - input.
     * Return 200 or 400+.
     */
    public function putAuthors($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
        
        if ( !$this->checkAuthorsId($params['id']) )
            return $this->error(406, 35);
            
        if ( !Validate::checkName($params['name']) )
            return $this->error(406, 36);

        if ( $this->checkAuthorsName($params['name']) )
            return $this->error(406, 39);

        $arrParams['id'] = $params['id'];
        $arrParams['authorsName'] = $params['name'];
    
        $sql = 'UPDATE bookshop_authors
                SET authorsName = :authorsName
                WHERE id = :id';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Removing an author from a table.
     * /hash(admin)/id(author) - input.
     * Put 0 id (empty) in the binding table.
     * Return 200 or 400+.
     */
    public function deleteAuthors($params)
    {
        list($hash, $authorId) = explode('/', $params['params'], 3);

        if ( !$this->checkAdminRights($hash) )
            return $this->error(406, 33);
    
        if ( !$this->checkAuthorsId($authorId) )
            return $this->error(404, 37);
        
        $sql = 'UPDATE bookshop_books_to_authors
                SET id_author = 0
                WHERE id_author = :id';
        $this->db->execute($sql, ['id' => $authorId]);
        
        $sql = 'DELETE FROM bookshop_authors
                WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $authorId]);
        
        if (!$result)
            return $this->error();

        return TRUE;
    }

    /** 
     * Check id in the table authors
     * Return bool
     */
    private function checkAuthorsId($id)
    {
        $sql = 'SELECT id FROM bookshop_authors WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check name in the table authors
     * Return bool
     */
    private function checkAuthorsName($name)
    {
        $sql = 'SELECT authorsName FROM bookshop_authors WHERE authorsName = :authorsName';
        $result = $this->db->execute($sql, ['authorsName' => $name]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Checking user access by hash.
     * Return bool.
     */
    private function checkAdminRights($hash)
    {
        $sql = 'SELECT admin FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        if (!$result or $result[0]['admin'] == 0)
            return FALSE;

        return TRUE;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new AdminAuthors );
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

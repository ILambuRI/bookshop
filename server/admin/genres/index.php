<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class AdminGenres
{
    use Error;
    
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }

    /**
     * Add genre to table.
     * hash(admin) | name(genre) - input.
     * Return 200 or 400+.
     */
    public function postGenres($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
            
        if ( !Validate::checkName($params['name']) )
            return $this->error(406, 40);

        if ( $this->checkGenresName($params['name']) )
            return $this->error(406, 41);

        $sql = 'INSERT INTO bookshop_genres (genresName)
                VALUES (:genresName)';
        $result = $this->db->execute($sql, ['genresName' => $params['name']]);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Change of genre's name.
     * hash(admin) | id(genres) | name(new genre) - input.
     * Return 200 or 400+.
     */
    public function putGenres($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);
        
        if ( !$this->checkGenresId($params['id']) )
            return $this->error(404, 42);
            
        if ( !Validate::checkName($params['name']) )
            return $this->error(406, 43);

        if ( $this->checkGenresName($params['name']) )
            return $this->error(406, 44);

        $arrParams['id'] = $params['id'];
        $arrParams['genresName'] = $params['name'];
    
        $sql = 'UPDATE bookshop_genres
                SET genresName = :genresName
                WHERE id = :id';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Removing an genre from a table.
     * /hash(admin)/id(genre) - input.
     * Put 0 id (empty) in the binding table.
     * Return 200 or 400+.
     */
    public function deleteGenres($params)
    {
        list($hash, $genreId) = explode('/', $params['params'], 3);

        if ( !$this->checkAdminRights($hash) )
            return $this->error(406, 33);
    
        if ( !$this->checkGenresId($genreId) )
            return $this->error(404, 45);
        
        $sql = 'UPDATE bookshop_books_to_genres
                SET id_genre = 0
                WHERE id_genre = :id';
        $this->db->execute($sql, ['id' => $genreId]);
        
        $sql = 'DELETE FROM bookshop_genres
                WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $genreId]);
        
        if (!$result)
            return $this->error();

        return TRUE;
    }

    /** 
     * Check id in the table genres
     * Return bool
     */
    private function checkGenresId($id)
    {
        $sql = 'SELECT id FROM bookshop_genres WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check name in the table genres
     * Return bool
     */
    private function checkGenresName($name)
    {
        $sql = 'SELECT genresName FROM bookshop_genres WHERE genresName = :genresName';
        $result = $this->db->execute($sql, ['genresName' => $name]);
        
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
        $api = new Rest( new AdminGenres );
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
}
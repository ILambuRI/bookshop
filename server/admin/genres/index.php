<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;
use lib\services\Validate;
use lib\services\Convert;

class Genres extends Rest
{
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
    protected function postGenres()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
            
        if ( !Validate::checkName($this->params['name']) )
            $this->response( '', 406, '040', true );

        if ( $this->checkGenresName($this->params['name']) )
            $this->response( '', 406, '041', true );

        $sql = 'INSERT INTO bookshop_genres (genresName)
                VALUES (:genresName)';
        $result = $this->db->execute($sql, ['genresName' => $this->params['name']]);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Change of genre's name.
     * hash(admin) | id(genres) | name(new genre) - input.
     * Return 200 or 400+.
     */
    protected function putGenres()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );
        
        if ( !$this->checkGenresId($this->params['id']) )
            $this->response( '', 404, '042', true );
            
        if ( !Validate::checkName($this->params['name']) )
            $this->response( '', 406, '043', true );

        if ( $this->checkGenresName($this->params['name']) )
            $this->response( '', 406, '044', true );

        $arrParams['id'] = $this->params['id'];
        $arrParams['genresName'] = $this->params['name'];
    
        $sql = 'UPDATE bookshop_genres
                SET genresName = :genresName
                WHERE id = :id';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Removing an genre from a table.
     * /hash(admin)/id(genre) - input.
     * Put 0 id (empty) in the binding table.
     * Return 200 or 400+.
     */
    protected function deleteGenres()
    {
        list($hash, $genreId) = explode('/', $this->params['params'], 3);

        if ( !$this->checkAdminRights($hash) )
            $this->response( '', 406, '033', true );
    
        if ( !$this->checkGenresId($genreId) )
            $this->response( '', 404, '045', true );
        
        $sql = 'UPDATE bookshop_books_to_genres
                SET id_genre = 0
                WHERE id_genre = :id';
        $this->db->execute($sql, ['id' => $genreId]);
        
        $sql = 'DELETE FROM bookshop_genres
                WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $genreId]);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /** 
     * Check id in the table genres
     * Return bool
     */
    protected function checkGenresId($id)
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
    protected function checkGenresName($name)
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
    $api = new Genres;
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
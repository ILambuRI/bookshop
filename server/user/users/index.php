<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class Users
{
    use Error;
    
    /**Database object (PDO)*/
    private $db;
    
    public function __construct()
    {
        $this->db = new Db();
    }
    
    /**
     * /login - check if there is a login in the table.
     * /null(or false)/hash - check hash in table or hash lifetime.
     * Return 200 or 400+.
     */
    public function getUsersByParams($params)
    {
        list($arrParams['login'],
             $arrParams['hash']
        ) = explode('/', $params['params'], 3);
        
        if ( ($arrParams['login'] != 'false' && $arrParams['login'] != 'null' && $arrParams['login'] != null)
             &&
             ($arrParams['hash'] == 'false' || $arrParams['hash'] == 'null' ||  $arrParams['hash'] == null) )
        {
            if ( !Validate::checkLogin($arrParams['login']) )
                return $this->error(406, 12);

            $sql = 'SELECT login FROM bookshop_users WHERE login = :login';
            $result = $this->db->execute($sql, ['login' => $arrParams['login']]);
            
            if (!$result)
                return $this->error();

            return TRUE;
        }

        if ( ($arrParams['hash'] != 'false' && $arrParams['hash'] != 'null' && $arrParams['hash'] != null)
             &&
             ($arrParams['login'] == 'false' || $arrParams['login'] == 'null' ||  $arrParams['login'] == null) )
        {
            $sql = 'SELECT lifetime FROM bookshop_users WHERE hash = :hash';
            $result = $this->db->execute($sql, ['hash' => $arrParams['hash']]);
            
            if (!$result)
                return $this->error();
            
            if ( ((int)$result[0]['lifetime'] + HASH_LIFETIME) < time() )
                return $this->error(406, 13);

            return TRUE;
        }

        return $this->error(404, 14);
    }

    /**
     * Registration - write a new user in table.
     * login | password | phone - input.
     * Return hash.
     */
    public function postUsers($params)
    {
        if ( !Validate::checkLogin($params['login']) )
            return $this->error(406, 3);

        if ( !Validate::checkPassword($params['password']) )
            return $this->error(406, 5);

        if ( !Validate::checkPhone($params['phone']) )
            return $this->error(406, 6);

        if ( $this->checkLogin($params['login']) )
            return $this->error(406, 4);

        $params['password'] = Convert::toMd5($params['password']);
        $params['hash'] = Convert::toMd5( $params['login'] . rand(12345, PHP_INT_MAX) );
        $params['lifetime'] = time();

        $sql = 'INSERT INTO bookshop_users (login, password, phone, id_discount, hash, lifetime)
                VALUES (:login, :password, :phone, 1, :hash, :lifetime)';
        $result = $this->db->execute($sql, $params);

        if (!$result)
            return $this->error();

        return [ ['hash' => $params['hash']] ];
    }

    /**
     * Login - user authorization, if it is in the table,
     * we write a new hash and lifetime.
     * login | password - input
     * Return user info whith new hash.
     */
    public function putUsers($params)
    {
        if ( !Validate::checkLogin($params['login']) )
            return $this->error(406, 7);

        if ( !Validate::checkPassword($params['password']) )
            return $this->error(406, 8);
        
        $params['password'] = Convert::toMd5($params['password']);
        
        if ( !$this->checkLogin($params['login']) )
            return $this->error(406, 9);

        if ( !$this->checkPassword($params['login'], $params['password']) )
            return $this->error(406, 10);
            
        $arrParams['login'] = $params['login'];
        $arrParams['hash'] = Convert::toMd5( $params['login'] . rand(12345, PHP_INT_MAX) );
        $arrParams['lifetime'] = time();
        
        $sql = 'UPDATE bookshop_users SET hash = :hash, lifetime = :lifetime
                WHERE login = :login';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            return $this->error();
            
        return $this->getUserInfo($arrParams['hash']);
    }

    /**
     * Logout - removing (updating) a hash in tables.
     * /hash - input
     * Return 200 or 400+.
     */
    public function deleteUsers($params)
    {
        if ( !$this->checkHash($params['params']) )
            return $this->error(404, 11);

        $newHash = Convert::toMd5( rand(12345, PHP_INT_MAX) );        
        $sql = 'UPDATE bookshop_users SET hash = "' .$newHash. '" WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $params['params']]);
        
        if (!$result)
            return $this->error();

        return TRUE;
    }

    /** 
     * Check login in the table
     * Return bool
     */
    private function checkLogin($login)
    {
        $sql = 'SELECT login FROM bookshop_users WHERE login = :login';
        $result = $this->db->execute($sql, ['login' => $login]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check password in the table
     * Return bool
     */
    private function checkPassword($login, $password)
    {
        $sql = 'SELECT password FROM bookshop_users WHERE login = :login AND password = :password';
        $result = $this->db->execute($sql, ['login' => $login, 'password' => $password]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check hash in the table
     * Return bool
     */
    private function checkHash($hash)
    {
        $sql = 'SELECT hash FROM bookshop_users WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    
    /** 
     * Get user info.
     * Return array.
     */
    private function getUserInfo($hash)
    {
        $sql = 'SELECT bookshop_users.login,
                       bookshop_discounts.percent,
                       bookshop_users.hash,
                       bookshop_users.admin,
                       bookshop_users.active
                FROM bookshop_users
                    INNER JOIN bookshop_discounts
                    ON bookshop_users.id_discount = bookshop_discounts.id 
                WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $hash]);

        return $result[0];
    }

    /** 
     * Get lifetime from the table by login
     * Return time or false
     */
    private function getTime($login)
    {
        $sql = 'SELECT lifetime FROM bookshop_users WHERE login = :login';
        $result = $this->db->execute($sql, ['login' => $login]);
        
        if (!$result)
            return FALSE;

        return $result;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new Users );
        $api->table = 'users';
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
<?php
require_once("../../config.php");

use lib\db\BookshopDb as Db;
use services\Validate;
use services\Convert;

class Users extends Rest
{
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
    protected function getUsersByParams()
    {
        list($arrParams['login'],
             $arrParams['hash']
        ) = explode('/', $this->params['params'], 3);
        
        if ( ($arrParams['login'] != 'false' && $arrParams['login'] != 'null' && $arrParams['login'] != null)
             &&
             ($arrParams['hash'] == 'false' || $arrParams['hash'] == 'null' ||  $arrParams['hash'] == null) )
        {
            if ( !Validate::checkLogin($arrParams['login']) )
                $this->response( '', 406, '012', true );

            $sql = 'SELECT login FROM bookshop_users WHERE login = :login';
            $result = $this->db->execute($sql, ['login' => $arrParams['login']]);
            
            if (!$result)
                $this->response( '', 404, '002', true );

            $this->response();
        }

        if ( ($arrParams['hash'] != 'false' && $arrParams['hash'] != 'null' && $arrParams['hash'] != null)
             &&
             ($arrParams['login'] == 'false' || $arrParams['login'] == 'null' ||  $arrParams['login'] == null) )
        {
            $sql = 'SELECT lifetime FROM bookshop_users WHERE hash = :hash';
            $result = $this->db->execute($sql, ['hash' => $arrParams['hash']]);
            
            if (!$result)
                $this->response( '', 404, '002', true );
            
            if ( ((int)$result[0]['lifetime'] + HASH_LIFETIME) < time() )
                $this->response( '', 404, '013', true );

            $this->response();
        }

        $this->response( '', 404, '014', true );        
    }

    /**
     * Registration - write a new user in table.
     * login | password | phone - input.
     * Return hash.
     */
    protected function postUsers()
    {
        if ( !Validate::checkLogin($this->params['login']) )
            $this->response( '', 406, '003', true );

        if ( !Validate::checkPassword($this->params['password']) )
            $this->response( '', 406, '005', true );

        if ( !Validate::checkPhone($this->params['phone']) )
            $this->response( '', 406, '006', true );

        if ( $this->checkLogin($this->params['login']) )
            $this->response( '', 406, '004', true );

        $this->params['password'] = Convert::toMd5($this->params['password']);
        $this->params['hash'] = Convert::toMd5( $this->params['login'] . rand(12345, PHP_INT_MAX) );
        $this->params['lifetime'] = time();

        $sql = 'INSERT INTO bookshop_users (login, password, phone, id_discount, hash, lifetime)
                VALUES (:login, :password, :phone, 1, :hash, :lifetime)';
        $result = $this->db->execute($sql, $this->params);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response([ ['hash' => $this->params['hash']] ]);
    }

    /**
     * Login - user authorization, if it is in the table,
     * we write a new hash and lifetime.
     * login | password - input
     * Return new hash.
     */
    protected function putUsers()
    {
        if ( !Validate::checkLogin($this->params['login']) )
            $this->response( '', 406, '007', true );

        if ( !Validate::checkPassword($this->params['password']) )
            $this->response( '', 406, '008', true );
        
        $this->params['password'] = Convert::toMd5($this->params['password']);
        
        if ( !$this->checkLogin($this->params['login']) )
            $this->response( '', 406, '009', true );

        if ( !$this->checkPassword($this->params['login'], $this->params['password']) )
            $this->response( '', 406, '010', true );
            
        $arrParams['login'] = $this->params['login'];
        $arrParams['hash'] = Convert::toMd5( $this->params['login'] . rand(12345, PHP_INT_MAX) );
        $arrParams['lifetime'] = time();
        
        $sql = 'UPDATE bookshop_users SET hash = :hash, lifetime = :lifetime
                WHERE login = :login';
        $result = $this->db->execute($sql, $arrParams);

        if (!$result)
            $this->response( '', 404, '002', true );
            
        $userInfo = $this->getUserInfo($arrParams['hash']);

        $this->response($userInfo);
    }

    /**
     * Logout - removing (updating) a hash in tables.
     * /hash - input
     * Return 200 or 400+.
     */
    protected function deleteUsers()
    {
        if ( !$this->checkHash($this->params['params']) )
            $this->response( '', 404, '011', true );

        $newHash = Convert::toMd5( rand(12345, PHP_INT_MAX) );        
        $sql = 'UPDATE bookshop_users SET hash = "' .$newHash. '" WHERE hash = :hash';
        $result = $this->db->execute($sql, ['hash' => $this->params['params']]);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /** 
     * Check login in the table
     * Return bool
     */
    protected function checkLogin($login)
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
    protected function checkPassword($login, $password)
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
    protected function checkHash($hash)
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
    protected function getUserInfo($hash)
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
    protected function getTime($login)
    {
        $sql = 'SELECT lifetime FROM bookshop_users WHERE login = :login';
        $result = $this->db->execute($sql, ['login' => $login]);
        
        if (!$result)
            return FALSE;

        return $result;
    }
}

try
{
    $api = new Users;
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
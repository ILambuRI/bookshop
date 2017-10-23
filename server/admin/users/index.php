<?php
require_once("../../config.php");
require_once("../Db.php");

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
     * /hash(admin) - get all users.
     * /hash(admin)/id(user) - get the user by ID.
     * Return array or 400+.
     */
    protected function getUsersByParams()
    {
        list($arrParams['hash'],
             $arrParams['id']
        ) = explode('/', $this->params['params'], 3);

        if ( !$this->checkAdminRights($arrParams['hash']) )
            $this->response( '', 406, '033', true );

        $sql = 'SELECT bookshop_users.id,
                       bookshop_users.login,
                       bookshop_users.password,
                       bookshop_users.phone,
                       bookshop_discounts.id AS discountsId,
                       bookshop_discounts.percent,
                       bookshop_users.admin,
                       bookshop_users.active
                FROM bookshop_users
                    INNER JOIN bookshop_discounts
                    ON bookshop_users.id_discount = bookshop_discounts.id';

        if ($arrParams['id'])
        {
            if ( !$this->checkUsersId($arrParams['id']) )
                $this->response( '', 404, '048', true );

            $sql .= ' WHERE bookshop_users.id = :id';
            $result = $this->db->execute($sql, ['id' => $arrParams['id']]);
        }
        else
            $result = $this->db->execute($sql);
        
        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response($result);
    }

    /**
     * Write a new user in table.
     * hash(admin) | login | password | phone | idDiscount | admin(1 or 0) | active(1 or 0)- input.
     * Return 200 or 400+.
     */
    protected function postUsers()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );

        if ( !Validate::checkLogin($this->params['login']) )
            $this->response( '', 406, '049', true );

        if ( !Validate::checkPassword($this->params['password']) )
            $this->response( '', 406, '050', true );

        if ( !Validate::checkPhone($this->params['phone']) )
            $this->response( '', 406, '051', true );

        if ( $this->checkLogin($this->params['login']) )
            $this->response( '', 406, '052', true );

        if ( !$this->checkDiscountId($this->params['idDiscount']) )
            $this->response( '', 404, '053', true );
        
        if ((int)$this->params['admin'] != 1 && (int)$this->params['admin'] != 0)
            $this->response( '', 406, '054', true );
        
        if ((int)$this->params['active'] != 1 && (int)$this->params['active'] != 0)
            $this->response( '', 406, '055', true );
        
        $this->params['password'] = Convert::toMd5($this->params['password']);
        $this->params['hash'] = Convert::toMd5( $this->params['login'] . rand(12345, PHP_INT_MAX) );
        $this->params['lifetime'] = time();

        $sql = 'INSERT INTO bookshop_users (login, password, phone, id_discount, hash, lifetime, admin, active)
                VALUES (:login, :password, :phone, :idDiscount, :hash, :lifetime, :admin, :active)';
        $result = $this->db->execute($sql, $this->params);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
    }

    /**
     * Update user data.
     * hash(admin) | id(users) | login | password | phone | idDiscount | admin(1 or 0) | active(1 or 0)- input.
     * Return 200 or 400+.
     */
    protected function putUsers()
    {
        if ( !$this->checkAdminRights($this->params['hash']) )
            $this->response( '', 406, '033', true );

        if ( !$this->checkUsersId($this->params['id']) )
            $this->response( '', 404, '056', true );

        if ( !Validate::checkLogin($this->params['login']) )
            $this->response( '', 406, '057', true );

        if ( !Validate::checkPassword($this->params['password']) )
            $this->response( '', 406, '058', true );

        if ( !Validate::checkPhone($this->params['phone']) )
            $this->response( '', 406, '059', true );

        if ( !$this->checkDiscountId($this->params['idDiscount']) )
            $this->response( '', 404, '060', true );
        
        if ((int)$this->params['admin'] != 1 && (int)$this->params['admin'] != 0)
            $this->response( '', 406, '061', true );
        
        if ((int)$this->params['active'] != 1 && (int)$this->params['active'] != 0)
            $this->response( '', 406, '062', true );
        
        $this->params['password'] = Convert::toMd5($this->params['password']);
        $this->params['hash'] = Convert::toMd5( $this->params['login'] . rand(12345, PHP_INT_MAX) );
        $this->params['lifetime'] = time();

        $sql = 'UPDATE bookshop_users
                SET login = :login,
                    password = :password,
                    phone = :phone,
                    hash = :hash,
                    lifetime = :lifetime,
                    admin = :admin,
                    active = :active,
                    id_discount = :idDiscount
                WHERE id = :id';
        $result = $this->db->execute($sql, $this->params);

        if (!$result)
            $this->response( '', 404, '002', true );

        $this->response();
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

    /** 
     * Check id in the table users.
     * Return bool.
     */
    protected function checkUsersId($id)
    {
        $sql = 'SELECT id FROM bookshop_users WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check id in the table discounts.
     * Return bool.
     */
    protected function checkDiscountId($id)
    {
        $sql = 'SELECT id FROM bookshop_discounts WHERE id = :id';
        $result = $this->db->execute($sql, ['id' => $id]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }

    /** 
     * Check login in the table users.
     * Return bool.
     */
    protected function checkLogin($login)
    {
        $sql = 'SELECT login FROM bookshop_users WHERE login = :login';
        $result = $this->db->execute($sql, ['login' => $login]);
        
        if (!$result)
            return FALSE;

        return TRUE;
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
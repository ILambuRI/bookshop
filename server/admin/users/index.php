<?php
require_once(__DIR__ . "/../../config.php");

use lib\db\BookshopDb as Db;
use lib\traits\Error;
use lib\services\Validate;
use lib\services\Convert;

class AdminUsers
{
    use Error;
    
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
    public function getUsersByParams($params)
    {
        list($arrParams['hash'],
             $arrParams['id']
        ) = explode('/', $params['params'], 3);

        if ( !$this->checkAdminRights($arrParams['hash']) )
            return $this->error(406, 33);

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
                return $this->error(404, 48);

            $sql .= ' WHERE bookshop_users.id = :id';
            $result = $this->db->execute($sql, ['id' => $arrParams['id']]);
        }
        else
            $result = $this->db->execute($sql);
        
        if (!$result)
            return $this->error();

        return $result;
    }

    /**
     * Write a new user in table.
     * hash(admin) | login | password | phone | idDiscount | admin(1 or 0) | active(1 or 0)- input.
     * Return 200 or 400+.
     */
    public function postUsers($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);

        if ( !Validate::checkLogin($params['login']) )
            return $this->error(406, 49);

        if ( !Validate::checkPassword($params['password']) )
            return $this->error(406, 50);

        if ( !Validate::checkPhone($params['phone']) )
            return $this->error(406, 51);

        if ( $this->checkLogin($params['login']) )
            return $this->error(406, 52);

        if ( !$this->checkDiscountId($params['idDiscount']) )
            return $this->error(404, 53);
        
        if ((int)$params['admin'] != 1 && (int)$params['admin'] != 0)
            return $this->error(406, 54);
        
        if ((int)$params['active'] != 1 && (int)$params['active'] != 0)
            return $this->error(406, 55);
        
        $params['password'] = Convert::toMd5($params['password']);
        $params['hash'] = Convert::toMd5( $params['login'] . rand(12345, PHP_INT_MAX) );
        $params['lifetime'] = time();

        $sql = 'INSERT INTO bookshop_users (login, password, phone, id_discount, hash, lifetime, admin, active)
                VALUES (:login, :password, :phone, :idDiscount, :hash, :lifetime, :admin, :active)';
        $result = $this->db->execute($sql, $params);

        if (!$result)
            return $this->error();

        return TRUE;
    }

    /**
     * Update user data.
     * hash(admin) | id(users) | login | password | phone | idDiscount | admin(1 or 0) | active(1 or 0)- input.
     * Return 200 or 400+.
     */
    public function putUsers($params)
    {
        if ( !$this->checkAdminRights($params['hash']) )
            return $this->error(406, 33);

        if ( !$this->checkUsersId($params['id']) )
            return $this->error(404, 56);

        if ( !Validate::checkLogin($params['login']) )
            return $this->error(406, 57);

        if ( !Validate::checkPassword($params['password']) )
            return $this->error(406, 58);

        if ( !Validate::checkPhone($params['phone']) )
            return $this->error(406, 59);

        if ( !$this->checkDiscountId($params['idDiscount']) )
            return $this->error(406, 60);
        
        if ((int)$params['admin'] != 1 && (int)$params['admin'] != 0)
            return $this->error(406, 61);
        
        if ((int)$params['active'] != 1 && (int)$params['active'] != 0)
            return $this->error(406, 62);
        
        $params['password'] = Convert::toMd5($params['password']);
        $params['hash'] = Convert::toMd5( $params['login'] . rand(12345, PHP_INT_MAX) );
        $params['lifetime'] = time();

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
        $result = $this->db->execute($sql, $params);

        if (!$result)
            return $this->error();

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

    /** 
     * Check id in the table users.
     * Return bool.
     */
    private function checkUsersId($id)
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
    private function checkDiscountId($id)
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
    private function checkLogin($login)
    {
        $sql = 'SELECT login FROM bookshop_users WHERE login = :login';
        $result = $this->db->execute($sql, ['login' => $login]);
        
        if (!$result)
            return FALSE;

        return TRUE;
    }
}

if (PHP_SAPI !== 'cli')
{
    try
    {
        $api = new Rest( new AdminUsers );
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
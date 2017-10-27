<?php

/** As service for the tests */
class testDb
{
    private $dbh;

    public function __construct()
    {
        $this->dbh = new PDO('mysql:host=' .M_HOST. ';dbname=' . M_DB, M_USER, M_PASS);

        if ( !$this->dbh )
            return FALSE;
    }

    public function exec($sql)
    {
        $count = $this->dbh->exec($sql);

        if ($count === FALSE)
            return FALSE;

        return $count;
    }

    public function lastId()
    {
        return $this->dbh->lastInsertId();
    }    
}
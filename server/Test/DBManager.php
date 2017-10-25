<?php

require_once('/../config.php');

class DBManager
{
	/** @var PDO */
	private static $pdo = null;

	private $cacheToDelete = array();

	public function __construct()
	{
		if (!self::$pdo)
		{
			self::$pdo = new PDO('mysql:host=' .M_HOST. ';dbname=' . M_DB, M_USER, M_PASS);
		}


	}

	public function addDBRecord($queryToInsert, $queryToDelete = '')
	{
		if (self::$pdo->exec($queryToInsert) !== false)
		{
			if ($queryToDelete)
			{
				$this->cacheToDelete[] = $queryToDelete;
			}
		}
		else
		{
			throw new Exception('Error while insert!' . $queryToInsert);
		}
	}
	public function addToClear($query)
	{
		$this->cacheToDelete[] = $query;;
	}

	public function clear()
	{
		foreach ($this->cacheToDelete as $query)
		{
			self::$pdo->exec($query);
		}
	}

	public function getDBRecord($query)
	{
		if(!$stmt = self::$pdo->query($query))
		{
			throw new Exception('Invlid query!' . $query);
		}

		$result = array();
		if ($stmt instanceof PDOStatement)
		{
			foreach ($stmt as $row)
			{
				$result[] = $row;
			}
		}

		return $result;
	}
}

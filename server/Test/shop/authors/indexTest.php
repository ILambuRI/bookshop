<?php
include __DIR__ . '/../../../shop/authors/index.php';
include __DIR__ . '/../../DBManager.php';

class AuthorsTest extends PHPUnit_Framework_TestCase
{

	private $dbManager, $author;

	public function setUp()
	{
		$this->dbManager = new DBManager();

		$this->author = new Authors();
	}

	public function tearDown()
	{
		$this->dbManager->clear();
	}

	public function testGetAuthorsByParamsTrue()
    {
		$res = $this->author->getAuthorsByParams();
		$this->assertTrue(count($res) > 0);
    }

}

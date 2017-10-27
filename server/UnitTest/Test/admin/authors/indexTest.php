<?php
include __DIR__ . '/../../../../admin/authors/index.php';

class AdminAuthorsTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new AdminAuthors();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->db->exec('DELETE FROM bookshop_authors
						 WHERE authorsName = "Abracadabra"');
		$this->db->exec('DELETE FROM bookshop_authors
						 WHERE authorsName = "Abra cadabra"');
		$this->model = NULL;
		$this->db = NULL;

	}

	public function testPostAuthorsTrue()
	{
		$result = $this->model->postAuthors( ['hash' => ADMIN_HASH, 'name' => 'Abracadabra'] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPostAuthorsError()
	{
		$result = $this->model->postAuthors( ['hash' => ADMIN_HASH, 'name' => 'Abracadabra1 Tibidoh2'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutAuthorsTrue()
	{
		$this->db->exec('INSERT INTO bookshop_authors (authorsName)
						 VALUES ("Abracadabra")');
		$id = $this->db->lastId();								 
		$result = $this->model->putAuthors( ['hash' => ADMIN_HASH, 'id' => $id, 'name' => 'Abra cadabra'] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPutAuthorsError()
	{
		$result = $this->model->putAuthors( ['hash' => ADMIN_HASH, 'id' => 0, 'name' => 'No1 author2'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testDeleteAuthorsTrue()
	{
		$this->db->exec('INSERT INTO bookshop_authors (authorsName)
						 VALUES ("Abracadabra")');
		$id = $this->db->lastId();
		$result = $this->model->deleteAuthors( ['params' => ADMIN_HASH . '/' . $id] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testDeleteAuthorsError()
	{
		$result = $this->model->deleteAuthors( ['params' => 'ADMIN_HASH/1'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

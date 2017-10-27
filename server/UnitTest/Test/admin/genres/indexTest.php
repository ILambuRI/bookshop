<?php
include __DIR__ . '/../../../../admin/genres/index.php';

class AdminGenresTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new AdminGenres();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->db->exec('DELETE FROM bookshop_genres
						 WHERE genresName = "Abracadabra"');
		$this->db->exec('DELETE FROM bookshop_genres
						 WHERE genresName = "Abra cadabra"');
		$this->model = NULL;
		$this->db = NULL;

	}

	public function testPostGenresTrue()
	{
		$result = $this->model->postGenres( ['hash' => ADMIN_HASH, 'name' => 'Abracadabra'] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPostGenresError()
	{
		$result = $this->model->postGenres( ['hash' => ADMIN_HASH, 'name' => 'Abracadabra1 Tibidoh2'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutGenresTrue()
	{
		$this->db->exec('INSERT INTO bookshop_genres (genresName)
						 VALUES ("Abracadabra")');
		$id = $this->db->lastId();								 
		$result = $this->model->putGenres( ['hash' => ADMIN_HASH, 'id' => $id, 'name' => 'Abra cadabra'] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPutGenresError()
	{
		$result = $this->model->putGenres( ['hash' => ADMIN_HASH, 'id' => 0, 'name' => 'No1 author2'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testDeleteGenresTrue()
	{
		$this->db->exec('INSERT INTO bookshop_genres (genresName)
						 VALUES ("Abracadabra")');
		$id = $this->db->lastId();
		$result = $this->model->deleteGenres( ['params' => ADMIN_HASH . '/' . $id] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testDeleteGenresError()
	{
		$result = $this->model->deleteGenres( ['params' => 'ADMIN_HASH/1'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

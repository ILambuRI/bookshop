<?php
include __DIR__ . '/../../../../admin/users/index.php';

class AdminUsersTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new AdminUsers();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->db->exec('DELETE FROM bookshop_users
						 WHERE `login` = "Abracadabra"');
		$this->db->exec('DELETE FROM bookshop_users
						 WHERE `login` = "Abra cadabra"');
		// $this->db->exec('DELETE FROM bookshop_authors
		// 				 WHERE authorsName = "Abra cadabra"');
		$this->model = NULL;
		$this->db = NULL;

	}
	
	public function testGetUsersByParamsTrue()
	{
		$result = $this->model->getUsersByParams( ['params' => ADMIN_HASH] );
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);

		$result = $this->model->getUsersByParams( ['params' => ADMIN_HASH . '/1'] );
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetUsersByParamsError()
	{
		$result = $this->model->getUsersByParams( ['params' => 'ADMIN_HASH'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);

		$result = $this->model->getUsersByParams( ['params' => ADMIN_HASH . '/AAA'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPostUsersTrue()
	{
		$result = $this->model->postUsers( [
			'hash' => ADMIN_HASH,
			'login' => 'Abracadabra',
			'password' => '12345',
			'phone' => '0987654321',
			'idDiscount' => 1,
			'admin' => 0,
			'active' => 0
		] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPostUsersError()
	{
		$result = $this->model->postUsers( [
			'hash' => ADMIN_HASH,
			'login' => 'Abracadabra',
			'password' => '12345',
			'phone' => 'AAAAAAAAA',
			'idDiscount' => 1,
			'admin' => 0,
			'active' => 0
		] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutUsersTrue()
	{
		$this->db->exec('INSERT INTO bookshop_users (login, password, phone, id_discount, hash, lifetime, admin, active)
                		 VALUES ("Abra cadabra", "password", 111111, 1, "hash", 111111, 0, 0)');
		$id = $this->db->lastId();								 
		$result = $this->model->putUsers( [
			'hash' => ADMIN_HASH,
			'id' => $id,
			'login' => 'Abracadabra',
			'password' => '12345',
			'phone' => '0987654321',
			'idDiscount' => 1,
			'admin' => 0,
			'active' => 0
		] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPutUsersError()
	{
		$result = $this->model->putUsers( [
			'hash' => ADMIN_HASH,
			'id' => 000,
			'login' => 'Abracadabra',
			'password' => '12345',
			'phone' => 'AAAAAAAAA',
			'idDiscount' => 1,
			'admin' => 0,
			'active' => 0
		] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

<?php
include __DIR__ . '/../../../../user/users/index.php';

class UsersTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new Users();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->db->exec('DELETE FROM bookshop_users
						 WHERE `login` = "Abracadabra"');

		$this->model = NULL;
		$this->db = NULL;

	}

	public function testGetUsersByParamsTrue()
	{
		$result = $this->model->getUsersByParams( ['params' => 'lambur'] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue(count($result) > 0);

		/* TRUE if timeout (code = 013) */
		$result = $this->model->getUsersByParams( ['params' => 'false/ADMIN_HASH'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayHasKey('code', $result);
		$this->assertCount(2, $result);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetUsersByParamsError()
	{
		$result = $this->model->getUsersByParams( ['params' => 'aaa'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);

		$result = $this->model->getUsersByParams( ['params' => 'false1/' . ADMIN_HASH] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPostUsersTrue()
	{
		$result = $this->model->postUsers( ['login' => 'Abracadabra', 'password' => '12345', 'phone' => '0987654321'] );
		$this->assertArrayHasKey('hash', $result[0]);
		$this->assertInternalType('array', $result);		
		$this->assertTrue(count($result) > 0);
	}

	public function testPostUsersError()
	{
		$result = $this->model->postUsers( ['login' => 'Lambur', 'password' => '12345', 'phone' => '0987654321'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutUsersTrue()
	{
		$result = $this->model->putUsers( ['login' => 'lama', 'password' => '12345'] );
		$this->assertArrayHasKey('hash', $result);
		$this->assertArrayNotHasKey('id', $result);		
		$this->assertTrue(count($result) > 0);
	}

	public function testPutUsersError()
	{
		$result = $this->model->putUsers( ['login' => 'Lambur2', 'password' => '12345'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testDeleteUsersTrue()
	{
		$result = $this->model->postUsers( ['login' => 'Abracadabra', 'password' => '12345', 'phone' => '0987654321'] );
		$result = $this->model->deleteUsers( ['params' => $result[0]['hash']] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testDeleteUsersError()
	{
		$result = $this->model->deleteUsers( ['params' => '111HASH111'] );
		$this->assertNotInternalType('bool', $result);		
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayHasKey('code', $result);
		$this->assertCount(2, $result);
		$this->assertTrue(count($result) > 0);
	}
}

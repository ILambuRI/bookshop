<?php
include __DIR__ . '/../../../../user/cart/index.php';

class CartTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new Cart();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->db->exec('DELETE FROM bookshop_cart
						 WHERE id_book = 1');
		$this->model = NULL;
		$this->db = NULL;

	}

	public function testGetCartByParamsTrue()
	{
		$this->model->postCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 10] );
		$result = $this->model->getCartByParams( ['params' => ADMIN_HASH] );
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetCartByParamsError()
	{
		$result = $this->model->getCartByParams( ['params' => 'a'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPostCartTrue()
	{
		$result = $this->model->postCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 10] );
		$this->assertNotInternalType('array', $result);
		$this->assertTrue($result);
	}

	public function testPostCartError()
	{
		$result = $this->model->postCart( ['hash' => ADMIN_HASH, 'id' => -1, 'count' => -10] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutCartTrue()
	{
		$this->model->postCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 5] );
		$result = $this->model->putCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 10] );
		$this->assertNotInternalType('array', $result);
		$this->assertTrue($result);
	}

	public function testPutCartError()
	{
		$result = $this->model->putCart( ['hash' => ADMIN_HASH, 'id' => -1, 'count' => -10] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testDeleteCartTrue()
	{
		$this->model->postCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 5] );
		$result = $this->model->deleteCart( ['params' => ADMIN_HASH . '/1'] );
		$this->assertNotInternalType('array', $result);
		$this->assertTrue($result);
	}

	public function testDeleteCartError()
	{
		$result = $this->model->deleteCart( ['params' => 'ADMIN_HASH/1'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

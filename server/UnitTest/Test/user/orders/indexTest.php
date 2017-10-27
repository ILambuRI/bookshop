<?php
include __DIR__ . '/../../../../user/orders/index.php';

class OrdersTest extends PHPUnit_Framework_TestCase
{
	private $model, $db;

	public function setUp()
	{
		$this->model = new Orders();
		$this->modelCart = new Cart();
		$this->db = new testDb();
	}

	public function tearDown()
	{
		$this->model = NULL;
		$this->modelCart = NULL;		
		$this->db = NULL;
	}

	public function testGetOrdersByParamsTrue()
	{
		$result = $this->model->getOrdersByParams( ['params' => ADMIN_HASH] );
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetOrdersByParamsError()
	{
		$result = $this->model->getOrdersByParams( ['params' => 'a'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPostOrdersTrue()
	{
		$this->modelCart->postCart( ['hash' => ADMIN_HASH, 'id' => 1, 'count' => 10] );
		$result = $this->model->postOrders( ['hash' => ADMIN_HASH, 'id' => 1] );
		$this->assertNotInternalType('array', $result);
		$this->assertTrue($result);
	}

	public function testPostOrdersError()
	{
		$result = $this->model->postOrders( ['hash' => ADMIN_HASH, 'id' => 0] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

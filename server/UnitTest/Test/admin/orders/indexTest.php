<?php
include __DIR__ . '/../../../../admin/orders/index.php';

class AdminOrdersTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new AdminOrders();
	}

	public function tearDown()
	{
		$this->model = NULL;
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
		$result = $this->model->getOrdersByParams( ['params' => 'ADMIN_HASH'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutOrdersTrue()
	{
		$result = $this->model->putOrders( ['hash' => ADMIN_HASH, 'idOrder' => 1, 'idStatus' => 4] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
		$this->model->putOrders( ['hash' => ADMIN_HASH, 'idOrder' => 1, 'idStatus' => 1] );
	}

	public function testPutOrdersError()
	{
		$result = $this->model->putOrders( ['hash' => 'ADMIN_HASH', 'idOrder' => 0, 'idStatus' => 0] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

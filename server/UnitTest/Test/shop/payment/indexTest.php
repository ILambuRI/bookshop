<?php
include __DIR__ . '/../../../../shop/payment/index.php';

class PaymentTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Payment();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetPaymentTrue()
    {
		$result = $this->model->getPayment();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
    }
}
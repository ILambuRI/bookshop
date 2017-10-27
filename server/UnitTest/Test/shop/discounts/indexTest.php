<?php
include __DIR__ . '/../../../../shop/discounts/index.php';

class DiscountsTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Discounts();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetDiscountsTrue()
    {
		$result = $this->model->getDiscounts();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
    }
}
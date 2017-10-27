<?php
include __DIR__ . '/../../../../shop/status/index.php';

class StatusTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Status();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetStatusTrue()
    {
		$result = $this->model->getStatus();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
    }
}
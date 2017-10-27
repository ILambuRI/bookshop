<?php
include __DIR__ . '/../../../../shop/authors/index.php';

class AuthorsTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Authors();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetAuthorsTrue()
	{
		$result = $this->model->getAuthors();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetAuthorsByParamsTrue()
	{
		$result = $this->model->getAuthorsByParams(['params' => 1]);
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetAuthorsByParamsError()
	{
		$result = $this->model->getAuthorsByParams( ['params' => 'a'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

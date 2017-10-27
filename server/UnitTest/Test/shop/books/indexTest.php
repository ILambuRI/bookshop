<?php
include __DIR__ . '/../../../../shop/books/index.php';

class BooksTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Books();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetBooksTrue()
	{
		$result = $this->model->getBooks();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetBooksByParamsTrue()
	{
		$result = $this->model->getBooksByParams(['params' => 1]);
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetBooksByParamsError()
	{
		$result = $this->model->getBooksByParams( ['params' => 'a'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

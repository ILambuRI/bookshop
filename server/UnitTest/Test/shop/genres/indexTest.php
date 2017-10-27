<?php
include __DIR__ . '/../../../../shop/genres/index.php';

class GenresTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new Genres();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testGetGenresTrue()
	{
		$result = $this->model->getGenres();
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetGenresByParamsTrue()
	{
		$result = $this->model->getGenresByParams(['params' => 1]);
		$this->assertArrayNotHasKey('status', $result);
		$this->assertArrayHasKey('id', $result[0]);
		$this->assertTrue(count($result) > 0);
	}

	public function testGetGenresByParamsError()
	{
		$result = $this->model->getGenresByParams( ['params' => 'a'] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

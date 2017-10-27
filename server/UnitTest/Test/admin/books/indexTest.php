<?php
include __DIR__ . '/../../../../admin/books/index.php';

class AdminBooksTest extends PHPUnit_Framework_TestCase
{
	private $model;

	public function setUp()
	{
		$this->model = new AdminBooks();
	}

	public function tearDown()
	{
		$this->model = NULL;
	}

	public function testPostBooksTrue()
	{
		$result = $this->model->postBooks( [
			'hash' => ADMIN_HASH,
			'name' => 'Abracadabra',
			'description' => 'Test description',
			'pubyear' => 1111,
			'price' => 1111,
			'idDiscount' => 1,
			'authorsId' => '1,2',
			'genresId' => '1,2',
		] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPostBooksError()
	{
		$result = $this->model->postBooks( [
			'hash' => ADMIN_HASH,
			'name' => 'Abracadabra',
			'description' => 'Test description',
			'pubyear' => 'AAAA',
			'price' => 'AAAA',
			'idDiscount' => 1,
			'authorsId' => '1,2',
			'genresId' => '1,2',
		] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}

	public function testPutBooksTrue()
	{
		$result = $this->model->putBooks( [
			'hash' => ADMIN_HASH,
			'id' => 1,
			'name' => 'Abracadabra Test 2',
			'description' => 'Test description',
			'pubyear' => 1111,
			'price' => 1111,
			'idDiscount' => 1,
			'authorsId' => '1,2',
			'genresId' => '1,2',
		] );
		$this->assertNotInternalType('array', $result);
		$this->assertInternalType('bool', $result);
		$this->assertTrue($result);
	}

	public function testPutBooksError()
	{
		$result = $this->model->putBooks( [
			'hash' => 'ADMIN_HASH',
			'id' => 1,
			'name' => 'Abracadabra Test 2',
			'description' => 'Test description',
			'pubyear' => 11112,
			'price' => 11113,
			'idDiscount' => 1,
			'authorsId' => '1,2',
			'genresId' => '1,2',
		] );
		$this->assertArrayHasKey('status', $result);
		$this->assertArrayNotHasKey('id', $result);
		$this->assertCount(2, $result);
		$this->assertFalse(count($result) == 0);
	}
}

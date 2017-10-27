<?php

use lib\Handler;
use lib\services\Validate;

class Rest
{
	/** Parameters from the URL */
	protected $params;

	/** Method name */
	protected $method;

	/** Table name in the database */
	public $table;

	/** Data handler object before response */
	protected $handler;

	protected $model;

	public function __construct($model)
	{
		$this->model = $model;
		$this->handler = new Handler();
	}
	
	/**
	 * Definition of transmission method and the response method.
	 * Setting the name of the method to start.
	 * Cleaning of incoming parameters.
	 */
	private function fragmentation()
	{
		$this->params = Validate::clearInputs($_GET);

		$this->params['params'] = $this->handler->setFormat($this->params['params']);

		if ($this->params['response_type_head'] == 'true')
			$this->handler->enableViaHeaders();

		switch($_SERVER['REQUEST_METHOD'])
		{
			case "GET":
				if ($this->params['params'] == '')
					$this->method = 'get' . ucfirst($this->table);
				else
					$this->method = 'get' .ucfirst($this->table). 'ByParams';
			break;

			case "POST":
				$this->method = 'post' . ucfirst($this->table);
				$this->params = Validate::trimArrayData($_POST);
			break;

			case "PUT":
				$this->method = 'put' . ucfirst($this->table);
				parse_str(file_get_contents("php://input"), $putParams);
				$this->params = Validate::trimArrayData($putParams);
			break;

			case "DELETE":
				$this->method = 'delete' . ucfirst($this->table);			
			break;

			default:
				$this->response('', 406, '0');
			break;
		}
	}

	protected function response($data = '', $code = 200, $headerText = false)
    {
		if ($data)
			$this->handler->setData($data);

		$this->handler->setResponseCode($code);

		if ($headerText)
		{
			echo $this->handler->answerError($headerText);
			exit();
		}
		else
		{
			echo $this->handler->answer();
			exit();
		}
	}
		
	/**
	 * Play baby, play!
	 * Running the installed method.
	 */
	public function play()
	{
		$this->fragmentation();

		if ( (int)method_exists($this->model, $this->method) > 0 )
		{
			$result = $this->model->{$this->method}($this->params);

			if ( is_array($result) && $result['status'] )
				$this->response('', $result['status'], $result['code']);
			elseif ( is_array($result) )
				$this->response($result);
			elseif ($result === TRUE)
				$this->response();
		}
		else
			$this->response('', 405, '1');
    }
}

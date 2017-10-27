<?php

namespace lib;

use lib\services\Convert;

class Handler
{
	/** Response format */
	private $contentType = DEFAULT_TYPE;

	/** Response code */
	private $code;

	/**
	 * The response type is always 200 or in headers.
	 * ?response_type_head=true - switches between them.
	 * (Default always 200).
	 */
	private $typeResponseCode = false;

	/** Data for handling */
	private $data;

    /** Toggle response via headers */
    public function enableViaHeaders()
    {
        $this->typeResponseCode = true;
	}
	
	/** Set data to handling */
	public function setData($data)
	{
		$this->data = $data;
	}

	/** Set response code */
	public function setResponseCode($code)
	{
		$this->code = $code;
	}

    /**
	 * Set the response format and removing it from URL.
	 *  @return string
	 */
	public function setFormat($urlString)
	{
		preg_match("/\.\w+$/", $urlString, $match);

		if ($match[0] == '.json' || $match[0] == '.xml' || $match[0] == '.txt' || $match[0] == '.xhtml')
		{
			$this->contentType = $match[0];
			$lengh = strlen($match[0]);
            $urlString = substr($urlString, 0, -$lengh);

            return $urlString;
		}

		return $urlString;
	}
	
	/**
	 * Forming the response 200
	 *  @return array
	 */
	private function answerTwoHundred($data)
	{
		$headerCode = 200;
		$msg = $this->getCodeMsg($this->code);
		
		if ($data)
			$dataStack['data'] = $data;
			
		$dataStack['server'] = ['status' => $this->code, 'msg' => $msg];
		
		$this->setHeaders($headerCode);

		return $this->converting($dataStack);
	}

	/**
	 * Formation of error response 200
	 *  @return array
	 */
	private function errorTwoHundred($headerText)
	{
		$headerCode = 200;
		$msg = (string)$headerText;
		
		$data['server'] = ['status' => $this->code, 'code' => $msg, 'information' => ERROR_CODE_INFORMATION];
		
		$this->setHeaders($headerCode, $headerText);
		
		return $this->converting($data);
	}

	/**
	 * Forming a response through headers
	 *  @return array
	 */
	private function answerThroughHeader($data)
	{
		$this->setHeaders($this->code);			

		return $this->converting($data);
	}

	/** 
	 * Formation of error response via headers
	 *  @return array
	 */
	private function errorThroughHeader($headerText)
	{
		$this->contentType = 'text/html';
		$string = ERROR_HTML_TEXT;
		ksort( $patterns = ['/%STATUS_CODE%/', '/%ERROR_DESCRIPTION%/', '/%CODE_NUMBER%/'] );
		ksort( $replacements = [$this->code, $this->getCodeMsg($this->code), ERROR_HEADER_CODE . $headerText] );
		$data =  preg_replace($patterns, $replacements, $string);

		$this->setHeaders($this->code, $headerText);			

		return $data;
	}

	/** 
	 * Response from the selected type
	 *  @return array
	 */
	public function answer()
	{
		if (!$this->typeResponseCode)
			return $this->answerTwoHundred($this->data);
		else
			return $this->answerThroughHeader($this->data);
	}

	/** Error response from the selected type */
	public function answerError($headerText)
	{
		if (!$this->typeResponseCode)
			return $this->errorTwoHundred($headerText);
		else
			return $this->errorThroughHeader($headerText);
	}

    /**
	 * Convert the data to the desired format for the answer.
	 *  @return array
	 */
	private function converting($data)
	{
		switch ($this->contentType)
		{
			case '.json':
				$data = Convert::toJson($data);
			break;
			
			case '.xml':
				$data = Convert::toXml($data);
			break;
			
			case '.txt':
				$data = Convert::toText($data);
			break;
			
			case '.xhtml':
				$data = Convert::toHtml($data);
			break;
		}
        
        return $data;
	}

	/**
	 * Set the headers. If there is an error, it supplements the error code.
	 */
	private function setHeaders($headerCode, $headerText = false)
    {
		if ($headerText)
			$headerText = DELIMITER . ERROR_HEADER_CODE . $headerText;

		header("HTTP/1.1 " . $headerCode . " " . $this->getCodeMsg($headerCode) . $headerText);
	}

    /**
	 * Just a set of errors and their description.
	 *  @return string
	 */
	private function getCodeMsg($code)
	{
		$codeMsg = [
			/* 100+ */
			100 => 'Continue', 101 => 'Switching Protocols',

			/* 200+ */
			200 => 'OK', 201 => 'Created', 202 => 'Accepted', 203 => 'Non-Authoritative Information',
			204 => 'No Content', 205 => 'Reset Content', 206 => 'Partial Content',

			/* 300+ */
			300 => 'Multiple Choices', 301 => 'Moved Permanently', 302 => 'Found', 303 => 'See Other',
			304 => 'Not Modified', 305 => 'Use Proxy', 306 => '(Unused)', 307 => 'Temporary Redirect',

			/* 400+ */
			400 => 'Bad Request', 401 => 'Unauthorized', 402 => 'Payment Required', 403 => 'Forbidden',
			404 => 'Not Found', 405 => 'Method Not Allowed', 406 => 'Not Acceptable',
			407 => 'Proxy Authentication Required', 408 => 'Request Timeout', 409 => 'Conflict', 410 => 'Gone',
			411 => 'Length Required', 412 => 'Precondition Failed', 413 => 'Request Entity Too Large',
			414 => 'Request-URI Too Long', 415 => 'Unsupported Media Type', 416 => 'Requested Range Not Satisfiable',
			417 => 'Expectation Failed',

			/* 500+ */
			500 => 'Internal Server Error', 501 => 'Not Implemented', 502 => 'Bad Gateway',
			503 => 'Service Unavailable', 504 => 'Gateway Timeout', 505 => 'HTTP Version Not Supported'
		];

		return $codeMsg[$code];
	}
}
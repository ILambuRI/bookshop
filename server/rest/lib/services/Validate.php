<?php

namespace lib\services;

class Validate
{
	/**
	 * Clears input data (trim, strip_tags, mb_strtolower, stripslashes)
	 * @return array
	 */
	static function clearInputs($data)
	{
		$clearData = [];

		if (is_array($data))
		{
			foreach ($data as $key => $val)
				$clearData[$key] = self::clearInputs($val);
		}
		else
		{
			if (get_magic_quotes_gpc())
				$data = trim(stripslashes($data));
			
			$data = mb_strtolower(strip_tags($data));
			$clearData = trim($data);
		}

		return $clearData;
	}

	/**
	 * Clears input data (trim, strip_tags, stripslashes and whitespace > 1)
	 * @return string
	 */
	static function clearText($data)
	{
		if (get_magic_quotes_gpc())
			$data = trim(stripslashes($data));
		
		$data = strip_tags($data);
		$data = preg_replace( '/\s{2,}/', ' ', trim($data) );

		if (strlen($data) < 3)
			return FALSE;

		return $data;
	}

	/**
	 * Сleaning the array from white space > 1
	 * @return array
	 */
	static function trimArrayData($data)
	{
		foreach ($data as $key => $value)
			$data[$key] = preg_replace( '/\s{2,}/', ' ', trim($value) );

		return $data;
	}

	/**
	 * Only Latin characters and only one space between words.
	 * @return bool
	 */
	static function checkName($str)
	{
		if (strlen($str) > 20 || strlen($str) < 3) return FALSE;
		return ( ! preg_match("/^[a-z]+(\s{1}[a-z]+)?$/i", $str) ) ? FALSE : TRUE;
	}

	/**
	 * Latin in the beginning necessarily and any Latin letters and numbers after.
	 * @return bool
	 */
	static function checkLogin($str)
	{
		if (strlen($str) > 20 || strlen($str) < 3) return FALSE;
		return ( ! preg_match("/^[a-z]+[0-9a-z]*$/i", $str) ) ? FALSE : TRUE;
	}
	
	/**
	 * Any Latin letters and numbers.
	 * @return bool
	 */
	static function checkPassword($str)
	{
		if (strlen($str) > 32 || strlen($str) < 5) return FALSE;
		return ( ! preg_match("/^[a-z0-9]+$/i", $str) ) ? FALSE : TRUE;
	}	
	
	/**
	 * Only numbers
	 * @return bool
	 */
	static function checkPhone($str)
	{
		if (strlen($str) > 20 || strlen($str) < 6) return FALSE;
		return ( ! preg_match("/^[0-9]+$/", $str) ) ? FALSE : TRUE;
	}	
	
	/**
	 * Only numbers
	 * @return bool
	 */
	static function onlyNumbers($str)
	{
		return ( ! preg_match("/^[0-9]+$/", $str) ) ? FALSE : TRUE;
	}	
}
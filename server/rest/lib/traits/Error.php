<?php

namespace lib\traits;

trait Error
{
    private function error($status = false, $errorCode = false)
    {
        if (!$status && !$errorCode)
            return ['status' => 404, 'code' => '2'];

        return ['status' => $status, 'code' => (string)$errorCode];
    }
}
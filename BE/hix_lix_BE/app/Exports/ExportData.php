<?php

namespace App\Exports;

use App\Models\khachhang;

class ExportData
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function transform()
    {
        $objects = [];
        foreach ($this->data as $row) {
            $khachHang = new khachhang([
                'ID_KH' => $row['ID_KH'],
                'TEN_KH' => $row['TEN_KH'],
                'SODIENTHOAI_KH' => $row['SODIENTHOAI_KH'],
                'TRANGTHAI_KH' => $row['TRANGTHAI_KH']
            ]);
            $objects[] = $khachHang;
        }

        return $objects;
    }
}

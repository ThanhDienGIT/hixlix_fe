<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;

class KhachHangExport implements FromCollection, WithHeadings, WithMapping
{
    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        return collect($this->data);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Họ và tên',
            'Số điện thoại',
            'Trạng thái khảo sát',
            // Thêm tiêu đề cột khác nếu cần.
        ];
    }

    public function map($row): array
    {
        // Ánh xạ dữ liệu từ collection thành các cột tương ứng.
        return [
            $row['ID_KH'],
            mb_convert_encoding($row['TEN_KH'], 'UTF-8', 'UTF-8'), // Chuyển đổi mã hóa
            mb_convert_encoding($row['SODIENTHOAI_KH'], 'UTF-8', 'UTF-8'), // Chuyển đổi mã hóa
            $row['TRANGTHAI_KH'],
            // Ánh xạ thêm cột khác nếu cần.
        ];
    }
}

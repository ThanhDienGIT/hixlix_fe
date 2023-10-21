<?php

namespace App\Exports;

use App\Models\khachhang;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class KhachHangExport implements FromCollection, WithHeadings, WithMapping
{
    protected $data;
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        return collect($this->data);
    }


    // public function query()
    // {

    //     return khachhang::query()
    //     ->select('ID_KH','TEN_KH');
    // }


    // public function headings(): array
    // {
    //     return [
    //         'ID',
    //         'Tên',
    //         // Thêm tiêu đề cột khác nếu cần.
    //     ];
    // }
    // public function styles(Worksheet $sheet)
    // {
    //     return [
    //         'A1' => ['font' => ['bold' => true]],
    //         'A2' => ['font' => ['bold' => true]],
    //     ];
    // }
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
            $row[0],
        //    $row[1], // Chuyển đổi mã hóa
        //     $row[2], // Chuyển đổi mã hóa
        //     $row[3],
            // Ánh xạ thêm cột khác nếu cần.
        ];
    }

    // public function styles(Worksheet $sheet)
    // {
    //     $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(12, true);
    //     $sheet->getStyle('B1')->getFont()->setBold(true)->setSize(12, true);
    //     $sheet->getStyle('C1')->getFont()->setBold(true)->setSize(12, true);
    //     $sheet->getStyle('D1')->getFont()->setBold(true)->setSize(12, true);
    //     $sheet->getStyle('E1')->getFont()->setBold(true)->setSize(12, true);
    // }
}
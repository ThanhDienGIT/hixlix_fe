<?php

namespace App\Http\Controllers;

use App\Exports\ExportData;
use App\Models\donvihanhchinh;
use App\Models\khachhang;
use App\Models\nhanvien;
use App\Models\phieukhaosat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\KhachHangExport;
use App\Models\dichvu;
use Maatwebsite\Excel\Excel as ExcelExcel;
use PhpOffice\PhpSpreadsheet\IOFactory;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Carbon\Carbon;

class danhsachkhachhang extends Controller
{
    public function getNV()
    {
        $result = nhanvien::all();
        if ($result) {
            return response()->json(['dsnv' => $result], 200);
        } else {
            return response()->json(['dsnv' => []], 200);
        }
    }
    public function asigncustomer(Request $request)
    {
        if ($request->ID_NV === "" || $request->ID_NV === 0) {
            return response()->json(["status" => "failed", "message" => "Bạn chưa chọn nhân viên để phân công khảo sát"], 400);
        } else {
            foreach ($request->DSKH as $kh) {
                $checkExistAsignment = khachhang::where('ID_KH', $kh)->get();
                if ($checkExistAsignment) {
                    khachhang::where('ID_KH', $kh)->update(['ID_NV' => $request->ID_NV]);
                    phieukhaosat::where('ID_KH', $kh)->update(['ID_NV' => $request->ID_NV]);
                }
            }
            return response()->json(["status" => "success", "message" => "Danh sách khách hàng cần khảo sát đã chuyển đến nhân viên."], 201);
        }
    }
    public function exportExcel(Request $request)
    {
        $dateFormat = 'dd/MM/yyyy'; // Định dạng ngày tháng dd/MM/yyyy

        $Data = $request->export_data;
        $templatePath = base_path('public/dskh_template.xlsx');

        // Load the template Excel file
        $spreadsheet = IOFactory::load($templatePath);

        // Get the first worksheet
        $worksheet = $spreadsheet->getActiveSheet();

        // Lấy ngày tháng năm hiện tại
        $currentDate = date('d/m/Y');  // Định dạng "dd/MM/yyyy"

        // Gán giá trị vào ô B4
        $worksheet->setCellValue('H4', 'Ngày: ' . $currentDate);

        // Lấy ô B4 và định dạng nó thành "dd/MM/yyyy"
        $cell = $worksheet->getCell('H4');
        $style = $cell->getStyle();
        $style->getNumberFormat()->setFormatCode('dd/mm/yyyy');

        // Nếu bạn muốn sao chép giá trị và định dạng từ ô B4 sang ô C4 (nếu đã được merge)
        $worksheet->setCellValue('I4', 'Ngày: ' . $currentDate);
        $cell = $worksheet->getCell('I4');
        $worksheet->setCellValue('J4', 'Ngày: ' . $currentDate);
        $cell = $worksheet->getCell('J4');
        $style = $worksheet->getStyle('H4');
        $style->getNumberFormat()->setFormatCode('dd/mm/yyyy');

        // Define a style for row 8 (or any other row you want to copy the style from)
        $style8 = $worksheet->getStyle('8:8');

        // Fill data into the worksheet, starting from row 9
        foreach ($Data as $rowIndex => $item) {
            $rowIndex += 8; // Start from row 9 (row 8 is for headers)

            // Copy style from row 8 to the current row
            $worksheet->duplicateStyle($style8, 'A' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'B' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'C' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'D' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'E' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'F' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'G' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'H' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'I' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'J' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'K' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'L' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'M' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'N' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'O' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'P' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'Q' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'R' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'S' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'T' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'U' . $rowIndex);
            $worksheet->duplicateStyle($style8, 'V' . $rowIndex);


            $worksheet->setCellValue('A' . $rowIndex, 'Hậu Giang');
            $worksheet->setCellValue('B' . $rowIndex, $item['TEN_HUYEN']);
            $worksheet->setCellValue('C' . $rowIndex, $item['TEN_XA']);
            $worksheet->setCellValue('D' . $rowIndex, $item['TEN_AP']);
            $worksheet->setCellValue('E' . $rowIndex, $item['TEN_KH']);
            $worksheet->setCellValue('F' . $rowIndex, $item['DIACHI_KH']);
            $worksheet->setCellValue('G' . $rowIndex, $item['SODIENTHOAI_KH']);
            $worksheet->setCellValue('H' . $rowIndex, $item['SONHANKHAU_KH']);
            $worksheet->setCellValue('I' . $rowIndex, $item['CCCD_KH']);
            $worksheet->setCellValue('J' . $rowIndex, $item['TENKHACHHANGDAIDIEN_CTPKS']);
            $worksheet->setCellValue('K' . $rowIndex, $item['SODIENTHOAIKHACHHANGDAIDIEN_CTPKS']);
            $worksheet->setCellValue('L' . $rowIndex, $item['ACCOUNTKHACHHANG_CTPKS']);
            $worksheet->setCellValue('M' . $rowIndex, $item['TEN_NCC']);
            $worksheet->setCellValue('N' . $rowIndex, $item['TEN_DV']);


            // Thiết lập định dạng tiền tệ cho cột 'O' tại hàng $rowIndex
            $cellCoordinate = 'O' . $rowIndex;
            $currencyFormat = '#,##0 ₫'; // Định dạng tiền tệ Việt Nam với ký hiệu đồng ₫
            $currencyValue = $item['MUCCUOC_CTPKS']; // Giá trị tiền tệ cần định dạng

            // Thiết lập định dạng cho ô cụ thể
            $worksheet->getStyle($cellCoordinate)->getNumberFormat()->setFormatCode($currencyFormat);
            $worksheet->setCellValue($cellCoordinate, $currencyValue);
            // $worksheet->setCellValue('O' . $rowIndex, $item['MUCCUOC_CTPKS']);

            // Xóa định dạng trong các ô H và I để tránh việc lan sang
            $worksheet->getStyle('H' . $rowIndex)->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_GENERAL);
            $worksheet->getStyle('I' . $rowIndex)->getNumberFormat()->setFormatCode(\PhpOffice\PhpSpreadsheet\Style\NumberFormat::FORMAT_GENERAL);



            $worksheet->setCellValue('P' . $rowIndex, $item['HINHTHUCDONG_CTPKS']);




            // Chuyển đổi sang định dạng 'dd/MM/yyyy'
            $worksheet->setCellValue('Q' . $rowIndex, date("d/m/Y", strtotime($item['NGAYBATDAUDONGCOC_CTPKS'])));
            $worksheet->setCellValue('R' . $rowIndex, date("d/m/Y", strtotime($item['NGAYKETTHUCDONGCOC_CTPKS'])));

            // Chuyển đổi sang định dạng 'dd/MM/yyyy'
            $worksheet->setCellValue('S' . $rowIndex, $item['CAMNHANDICHVU_CTPKS']);
            $worksheet->setCellValue('T' . $rowIndex, $item['CANNHANPHUCVU_CTPKS']);
            $worksheet->setCellValue('U' . $rowIndex, date("d/m/Y", strtotime($item['NGAYTAO_CTPKS'])));
            $worksheet->setCellValue('V' . $rowIndex, $item['TEN_NV']);
        }

        // Create a writer to save the spreadsheet to a temporary file
        $writer = new Xlsx($spreadsheet);
        $tempFilePath = tempnam(sys_get_temp_dir(), 'excel');
        $writer->save($tempFilePath);

        // Return the response to allow the client to download the Excel file
        return new BinaryFileResponse($tempFilePath);
    }


    public function filterreport($count, Request $request)
    {
        $dateObject = date_create_from_format('d/m/Y', $request->keywords);
        $id_nv = auth()->user()->ID_NV;
        $chucvu_nv = auth()->user()->CHUCVU_NV;
        if (!empty($request->keywords)) {
            if ($chucvu_nv === 0 || $chucvu_nv === 2) {
                $report = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TENKHACHHANGDAIDIEN_CTPKS', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_NCC', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_DV', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_NV', 'like', '%' . $request->keywords . '%');

                if ($dateObject !== false) {
                    $report->orWhere('NGAYBATDAUDONGCOC_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('NGAYKETTHUCDONGCOC_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('THOIGIANLAPDAT_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('THOIGIANNGUNG_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%');
                }

                if ($request->MAHUYEN_KH != 0) {
                    $report->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $report->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $report->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->quality_survey !== 5) {
                    if ($request->quality_survey === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>=', 5);
                    }
                    if ($request->quality_survey === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5);
                    }
                }
                if ($request->CHATLUONG_PV !== 5) {
                    if ($request->CHATLUONG_PV === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>=', 5);
                    }
                    if ($request->CHATLUONG_PV === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5);
                    }
                }
                if ($request->NHACUNGCAP !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS', $request->NHACUNGCAP);
                }
                if ($request->DICHVU !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.ID_DV', $request->DICHVU);
                }
                if ($request->TUNGAY !== '' && $request->DENNGAY != '') {
                    // Chuyển đổi định dạng ngày
                    $startDate = str_replace('/', '-', $request->TUNGAY);
                    $endDate = str_replace('/', '-', $request->DENNGAY);

                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    $report->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '>=', $startDate)
                        ->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '<=', $endDate);
                }

                $report = $report

                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dstk' => $report], 200);
            } else {
                $report = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('phieu_khao_sat.id_nv', $id_nv)
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TENKHACHHANGDAIDIEN_CTPKS', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_NCC', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_DV', 'like', '%' . $request->keywords . '%')
                    ->orWhere('TEN_NV', 'like', '%' . $request->keywords . '%');


                if ($dateObject !== false) {
                    $report->orWhere('NGAYBATDAUDONGCOC_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('NGAYKETTHUCDONGCOC_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('THOIGIANLAPDAT_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%')
                        ->orWhere('THOIGIANNGUNG_CTPKS', 'like', '%' . date_format($dateObject, 'Y-m-d') . '%');
                }

                if ($request->MAHUYEN_KH != 0) {
                    $report->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $report->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $report->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->quality_survey !== 5) {
                    if ($request->quality_survey === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>=', 5);
                    }
                    if ($request->quality_survey === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5);
                    }
                }
                if ($request->CHATLUONG_PV !== 5) {
                    if ($request->CHATLUONG_PV === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>=', 5);
                    }
                    if ($request->CHATLUONG_PV === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5);
                    }
                }
                if ($request->NHACUNGCAP !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS', $request->NHACUNGCAP);
                }
                if ($request->DICHVU !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.ID_DV', $request->DICHVU);
                }
                if ($request->TUNGAY !== '' && $request->DENNGAY != '') {
                    // Chuyển đổi định dạng ngày
                    $startDate = str_replace('/', '-', $request->TUNGAY);
                    $endDate = str_replace('/', '-', $request->DENNGAY);

                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    $report->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '>=', $startDate)
                        ->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '<=', $endDate);
                }

                $report = $report

                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dstk' => $report], 200);
            }
        } else {
            if ($chucvu_nv === 0 || $chucvu_nv === 2) {
                $report = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH');

                if ($request->MAHUYEN_KH != 0) {
                    $report->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $report->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $report->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->quality_survey !== 5) {
                    if ($request->quality_survey === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>=', 5);
                    }
                    if ($request->quality_survey === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5);
                    }
                }
                if ($request->CHATLUONG_PV !== 5) {
                    if ($request->CHATLUONG_PV === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>=', 5);
                    }
                    if ($request->CHATLUONG_PV === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5);
                    }
                }
                if ($request->NHACUNGCAP !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS', $request->NHACUNGCAP);
                }
                if ($request->DICHVU !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.ID_DV', $request->DICHVU);
                }
                if ($request->TUNGAY !== '' && $request->DENNGAY != '') {
                    // Chuyển đổi định dạng ngày
                    $startDate = str_replace('/', '-', $request->TUNGAY);
                    $endDate = str_replace('/', '-', $request->DENNGAY);

                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    $report->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '>=', $startDate)
                        ->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '<=', $endDate);
                }

                $report = $report

                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dstk' => $report], 200);
            } else {
                $report = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('phieu_khao_sat.id_nv', $id_nv);

                if ($request->MAHUYEN_KH != 0) {
                    $report->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $report->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $report->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->quality_survey !== 5) {
                    if ($request->quality_survey === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>=', 5);
                    }
                    if ($request->quality_survey === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5);
                    }
                }
                if ($request->CHATLUONG_PV !== 5) {
                    if ($request->CHATLUONG_PV === 0) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>=', 5);
                    }
                    if ($request->CHATLUONG_PV === 1) {
                        $report->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5);
                    }
                }
                if ($request->NHACUNGCAP !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS', $request->NHACUNGCAP);
                }
                if ($request->DICHVU !== 0) {
                    $report->where('chi_tiet_phieu_khao_sat_lix.ID_DV', $request->DICHVU);
                }
                if ($request->TUNGAY !== '' && $request->DENNGAY != '') {
                    // Chuyển đổi định dạng ngày
                    $startDate = str_replace('/', '-', $request->TUNGAY);
                    $endDate = str_replace('/', '-', $request->DENNGAY);

                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    // Thực hiện truy vấn với định dạng ngày phù hợp
                    $report->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '>=', $startDate)
                        ->where('chi_tiet_phieu_khao_sat_lix.NGAYTAO_CTPKS', '<=', $endDate);
                }

                $report = $report

                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dstk' => $report], 200);
            }
        }
    }



    public function searchcustomer($count, Request $request)
    {
        $id_nv = auth()->user()->ID_NV;
        $chucvu_nv = auth()->user()->CHUCVU_NV;
        if (!empty($request->keywords)) {
            if ($chucvu_nv === 0 || $chucvu_nv === 2) {
                $customers = khachhang::join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('sodienthoai_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_huyen.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_xa.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_ap.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('diachi_kh', 'like', '%' . $request->keywords . '%');

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                $customers = $customers->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            } else {
                $customers = khachhang::join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('sodienthoai_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_huyen.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_xa.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_ap.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('diachi_kh', 'like', '%' . $request->keywords . '%')
                    ->where('id_nv', $id_nv);

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                $customers = $customers->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            }
        } else {
            if ($chucvu_nv === 0 || $chucvu_nv === 2) {
                $customers = khachhang::join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH');

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                $customers = $customers->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            } else {
                $customers = khachhang::join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('id_nv', $id_nv);

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                $customers = $customers
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            }
        }
    }

    public function searchinasignment($count, Request $request)
    {
        $id_nv = auth()->user()->ID_NV;
        $chucvu_nv = auth()->user()->CHUCVU_NV;
        if (!empty($request->keywords)) {
            if ($chucvu_nv === 2 || $chucvu_nv === 0) {
                $customers = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                    ->leftJoin('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->leftJoin('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->leftJoin('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_huyen.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_xa.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_ap.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('diachi_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('nhan_vien.ten_nv', 'like', '%' . $request->keywords . '%');


                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                if ($request->PHANCONG !== 5) {
                    if ($request->PHANCONG === 0) {
                        $customers->whereNull('khach_hang.ID_NV');
                    } else {
                        $customers->whereNotNull('khach_hang.ID_NV');
                    }
                }

                $customers = $customers
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            } else {
                $customers = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                    ->leftJoin('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->leftJoin('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->leftJoin('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('khach_hang.id_nv', $id_nv)
                    ->where('ten_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_huyen.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_xa.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('dvhc_ap.name', 'like', '%' . $request->keywords . '%')
                    ->orWhere('diachi_kh', 'like', '%' . $request->keywords . '%')
                    ->orWhere('nhan_vien.ten_nv', 'like', '%' . $request->keywords . '%');

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                if ($request->PHANCONG !== 5) {
                    if ($request->PHANCONG === 0) {
                        $customers->whereNull('khach_hang.ID_NV');
                    } else {
                        $customers->whereNotNull('khach_hang.ID_NV');
                    }
                }

                $customers = $customers
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            }
        } else {
            if ($chucvu_nv === 2 || $chucvu_nv === 0) {
                $customers = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                    ->leftJoin('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->leftJoin('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->leftJoin('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH');

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                if ($request->PHANCONG !== 5) {
                    if ($request->PHANCONG === 0) {
                        $customers->whereNull('khach_hang.ID_NV');
                    } else {
                        $customers->whereNotNull('khach_hang.ID_NV');
                    }
                }

                $customers = $customers
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            } else {
                $customers = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                    ->leftJoin('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->leftJoin('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->leftJoin('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('khach_hang.id_nv', $id_nv);

                if ($request->MAHUYEN_KH != 0) {
                    $customers->where('khach_hang.MAHUYEN_KH', $request->MAHUYEN_KH);
                }
                if ($request->MAXA_KH != 0) {
                    $customers->where('khach_hang.MAXA_KH', $request->MAXA_KH);
                }
                if ($request->MAAP_KH !== 0) {
                    $customers->where('khach_hang.MAAP_KH', $request->MAAP_KH);
                }
                if ($request->status_survey !== 5) {
                    $customers->where('khach_hang.TRANGTHAI_KH', $request->status_survey);
                }

                if ($request->PHANCONG !== 5) {
                    if ($request->PHANCONG === 0) {
                        $customers->whereNull('khach_hang.ID_NV');
                    } else {
                        $customers->whereNotNull('khach_hang.ID_NV');
                    }
                }

                $customers = $customers
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                    ->paginate($count);
                return response()->json(['dskh' => $customers], 200);
            }
        }
    }
    public function deletecustomer($id)
    {
        $check_exist = phieukhaosat::where('ID_KH', $id)->get();
        if (count($check_exist) > 0) {
            return response()->json(['status' => 'failed', 'message' => 'Khách hàng này đang
             trong phiếu khảo sát nào đó! Vui lòng xóa các phiếu liên quan đến khách hàng này.'], 400);
        } else {
            $result = khachhang::where('ID_KH', $id)->delete();
            if ($result) {
                return response()->json(['status' => 'success', 'message' => 'Xóa khách hàng thành công.'], 201);
            } else {
                return response()->json(['status' => 'success', 'failed' => 'Xóa khách hàng thất bại.'], 201);
            }
        }
    }
    public function updatecustomer(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_KH' => 'required',
                'SODIENTHOAI_KH' => [
                    'required',
                    'numeric',
                    'digits:10',
                    Rule::unique('khach_hang', 'SODIENTHOAI_KH')->ignore($request->ID_KH, 'ID_KH')
                ],
                'CCCD_KH' => [
                    'required',
                    'numeric',
                    Rule::unique('khach_hang', 'CCCD_KH')->ignore($request->ID_KH, 'ID_KH')
                ],
                'MAHUYEN_KH' => 'required',
                'MAXA_KH' => 'required',
                'MAAP_KH' => 'required'
            ],
            [
                'TEN_KH.required' => 'Vui lòng nhập tên khách hàng',
                'SODIENTHOAI_KH.required' => 'Vui lòng nhập SĐT KH',
                'SODIENTHOAI_KH.numeric' => 'Vui lòng nhập SĐT KH là số',
                'SODIENTHOAI_KH.digits' => 'Vui lòng nhập SĐT KH tối đa 10 số',
                'SODIENTHOAI_KH.unique' => 'Vui lòng nhập SĐT KH là duy nhất',
                'CCCD_KH.required' => 'Vui lòng nhập CCCD KH',
                'CCCD_KH.numeric' => 'Vui lòng nhập CCCD KH là số',
                'CCCD_KH.unique' => 'Vui lòng nhập CCCD KH là duy nhất',
                'MAHUYEN_KH.required' => 'Vui lòng chọn huyện thị',
                'MAXA_KH.required' => 'Vui lòng chọn xã phường',
                'MAAP_KH.required' => 'Vui lòng chọn ấp, khu vực'
            ]
        );
        if ($validatedData->passes()) {
            $baohong = $request->BAOHONG_KH == "false" ? 0 : 1;
            $result = khachhang::where('ID_KH', $request->ID_KH)->update([
                'BAOHONG_KH' => $baohong,
                'CCCD_KH' => $request->CCCD_KH,
                'DIACHI_KH' => $request->DIACHI_KH,
                'MAHUYEN_KH' => $request->MAHUYEN_KH,
                'MAXA_KH' => $request->MAXA_KH,
                'MAAP_KH' => $request->MAAP_KH,
                'NGAYSINH_KH' => $request->NGAYSINH_KH,
                'NGHENGHIEP_KH' => $request->NGHENGHIEP_KH,
                'SODIENTHOAI_KH' => $request->SODIENTHOAI_KH,
                'SONHANKHAU_KH' => $request->SONHANKHAU_KH,
                'TEN_KH' => $request->TEN_KH
            ]);
            if ($result) {
                return response()->json(['status' => 'success', 'message' => 'Cập nhật khách hàng thành công'], 201);
            } else {
                return response()->json(['status' => 'failed', 'message' => 'Cập nhật khách hàng thất bại'], 400);
            }
        } else {
            // Lấy danh sách các lỗi từ validatedData
            $errors = $validatedData->errors();

            // Lặp qua danh sách lỗi và tạo một mảng thông báo lỗi
            $errorMessages = $errors->all();

            // Gộp các thông báo lỗi thành một chuỗi duy nhất
            $errorMessage = implode(', ', $errorMessages);

            // Trả về chuỗi thông báo lỗi gộp lại
            return response()->json([
                'status' => 'failed',
                'message' => $errorMessage,
            ], 400);
        }
    }
    public function getsurveybyKH($id)
    {
        $chucvu_nv = auth()->user()->CHUCVU_NV;
        if ($chucvu_nv === 0 || $chucvu_nv === 2) {
            $survey = phieukhaosat::join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                ->join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                ->where('phieu_khao_sat.ID_KH', $id)
                ->get();

            if ($survey !== null) {
                return response()->json($survey, 200);
            } else {
                return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
            }
        } else {
            $survey = phieukhaosat::join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                ->join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                ->where('phieu_khao_sat.ID_KH', $id)
                ->where('phieu_khao_sat.ID_NV', auth()->user()->ID_NV)
                ->get();

            if ($survey !== null) {
                return response()->json($survey, 200);
            } else {
                return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
            }
        }
    }
    public function addcustomer(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_KH' => 'required',
                'SODIENTHOAI_KH' => [
                    'required',
                    'numeric',
                    'digits:10',
                    Rule::unique('khach_hang', 'SODIENTHOAI_KH')
                ],
                'CCCD_KH' => [
                    'required',
                    'numeric',
                    Rule::unique('khach_hang', 'CCCD_KH')
                ],
                'MAHUYEN_KH' => 'required',
                'MAXA_KH' => 'required',
                'MAAP_KH' => 'required'
            ],
            [
                'TEN_KH.required' => 'Vui lòng nhập tên khách hàng',
                'SODIENTHOAI_KH.required' => 'Vui lòng nhập SĐT KH',
                'SODIENTHOAI_KH.numeric' => 'Vui lòng nhập SĐT KH là số',
                'SODIENTHOAI_KH.digits' => 'Vui lòng nhập SĐT KH tối đa 10 số',
                'SODIENTHOAI_KH.unique' => 'Vui lòng nhập SĐT KH là duy nhất',
                'CCCD_KH.required' => 'Vui lòng nhập CCCD KH',
                'CCCD_KH.numeric' => 'Vui lòng nhập CCCD KH là số',
                'CCCD_KH.unique' => 'Vui lòng nhập CCCD KH là duy nhất',
                'MAHUYEN_KH.required' => 'Vui lòng chọn huyện thị',
                'MAXA_KH.required' => 'Vui lòng chọn xã phường',
                'MAAP_KH.required' => 'Vui lòng chọn ấp'
            ]
        );
        if ($validatedData->passes()) {
            $baohong = $request->BAOHONG_KH == false ? 0 : 1;
            $result = khachhang::insert([
                'BAOHONG_KH' => $baohong,
                'CCCD_KH' => $request->CCCD_KH,
                'DIACHI_KH' => $request->DIACHI_KH,
                'MAHUYEN_KH' => $request->MAHUYEN_KH,
                'MAXA_KH' => $request->MAXA_KH,
                'MAAP_KH' => $request->MAAP_KH,
                'NGAYSINH_KH' => $request->NGAYSINH_KH,
                'NGAYTAO_KH' => $request->NGAYTAO_KH,
                'NGHENGHIEP_KH' => $request->NGHENGHIEP_KH,
                'SODIENTHOAI_KH' => $request->SODIENTHOAI_KH,
                'SONHANKHAU_KH' => $request->SONHANKHAU_KH,
                'TEN_KH' => $request->TEN_KH,
                'NGUOITAO_KH' => auth()->user()->ID_NV,
                'ID_NV' => auth()->user()->ID_NV,
                'TRANGTHAI_KH' => 0
            ]);
            if ($result) {
                $newlyInsertedID_KH = DB::getPdo()->lastInsertId();
                $subResult = phieukhaosat::insert([
                    'ID_KH' => $newlyInsertedID_KH,
                    'ID_NV' => auth()->user()->ID_NV,
                    'TRANGTHAI_PKS' => 0
                ]);
                if ($subResult) {
                    return response()->json(['status' => 'success', 'message' => 'Thêm mới khách hàng thành công'], 201);
                } else {
                    return response()->json(['status' => 'failed', 'message' => 'Thêm mới khách hàng thất bại'], 400);
                }
            }
        } else {
            // Lấy danh sách các lỗi từ validatedData
            $errors = $validatedData->errors();

            // Lặp qua danh sách lỗi và tạo một mảng thông báo lỗi
            $errorMessages = $errors->all();

            // Gộp các thông báo lỗi thành một chuỗi duy nhất
            $errorMessage = implode(', ', $errorMessages);

            // Trả về chuỗi thông báo lỗi gộp lại
            return response()->json([
                'status' => 'failed',
                'message' => $errorMessage,
            ], 400);
        }
    }
    public function getAllXaPhuong($id)
    {
        // $result = donvihanhchinh::where('CAP_DVHC', 2)->where('ID_CHA_DVHC', $id)->get();
        $result = DB::table('unit')->where('level', 3)->where('parent_code', $id)->get();
        if ($result) {
            return response(['xaphuong' => $result], 200);
        } else {
            return response(['xaphuong' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }

    public function getAllApById($id)
    {
        $result = DB::table('unit_village')->where('parent_code', $id)->get();
        if ($result) {
            return response(['ap' => $result], 200);
        } else {
            return response(['ap' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }
    public function getallquanhuyen()
    {
        // $result  = donvihanhchinh::where('CAP_DVHC', 1)->get();
        $result  = DB::table('unit')->where('parent_code', '93')->get();
        if ($result) {
            return response(['dvhc' => $result], 200);
        } else {
            return response(['dvhc' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }
    public function getAllAp($id)
    {
        $result  = DB::table('unit_village')
            ->where('parent_code', $id)->get();
        if ($result) {
            return response(['ap' => $result], 200);
        } else {
            return response(['ap' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }
    public function get_danhsachkhachhang($count)
    {

        // $user=auth()->user();
        $id_nv = auth()->user()->ID_NV;
        $chucvu_nv = auth()->user()->CHUCVU_NV;

        if ($chucvu_nv === 2 || $chucvu_nv === 0) {
            try {
                $DSKH = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    // ->where('khach_hang.id_nv', $id_nv)
                    ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                    ->paginate($count);

                if ($DSKH->isEmpty()) {
                    return response()->json(['message' => 'Không tìm thấy danh sách khách hàng'], 404);
                }
                // $DSKH_data = [];

                // foreach ($DSKH as $_DSKH) {
                //     $dskh_item = [
                //         'id_nv' => $id_nv,
                //         'danhsachkhachhang' => $_DSKH,
                //     ];
                //     $DSKH_data[] = $dskh_item;
                // }
                return response()->json($DSKH, 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $th->getMessage()], 500);
            }
        } else {
            // return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
            $DSKH = khachhang::leftJoin('nhan_vien', 'nhan_vien.ID_NV', '=', 'khach_hang.ID_NV')
                ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                ->where('khach_hang.id_nv', $id_nv)
                ->select('khach_hang.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP', 'nhan_vien.TEN_NV', 'nhan_vien.ID_NV')
                ->paginate($count);

            if ($DSKH->isEmpty()) {
                return response()->json(['message' => 'Không tìm thấy danh sách khách hàng'], 404);
            }
            // $DSKH_data = [];

            // foreach ($DSKH as $_DSKH) {
            //     $dskh_item = [
            //         'id_nv' => $id_nv,
            //         'danhsachkhachhang' => $_DSKH,
            //     ];
            //     $DSKH_data[] = $dskh_item;
            // }
            return response()->json($DSKH, 200);
        }
    }

    public function get_danhsachbaocaophieu($count)
    {

        // $user=auth()->user();
        $id_nv = auth()->user()->ID_NV;
        $chucvu_nv = auth()->user()->CHUCVU_NV;

        if ($chucvu_nv === 2 || $chucvu_nv === 0) {
            try {
                $DSTK = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    // ->where('phieu_khao_sat.id_nv', $id_nv)
                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);

                if ($DSTK->isEmpty()) {
                    return response()->json(['message' => 'Không tìm thấy danh sách báo cáo phiếu'], 404);
                }

                return response()->json($DSTK, 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $th->getMessage()], 500);
            }
        } else {
            // return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
            try {
                $DSTK = phieukhaosat::join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
                    ->join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
                    ->join('nha_cung_cap', 'nha_cung_cap.ID_NCC', '=', 'chi_tiet_phieu_khao_sat_lix.NHACUNGCAP_CTPKS')
                    ->join('khach_hang', 'khach_hang.ID_KH', '=', 'phieu_khao_sat.ID_KH')
                    ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
                    ->join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
                    ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
                    ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
                    ->where('phieu_khao_sat.id_nv', $id_nv)
                    ->select('nhan_vien.ID_NV', 'nhan_vien.TEN_NV', 'chi_tiet_phieu_khao_sat_lix.*', 'phieu_khao_sat.*', 'nha_cung_cap.*', 'khach_hang.*', 'dich_vu.*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
                    ->paginate($count);

                if ($DSTK->isEmpty()) {
                    return response()->json(['message' => 'Không tìm thấy danh sách báo cáo phiếu'], 404);
                }

                return response()->json($DSTK, 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $th->getMessage()], 500);
            }
        }
    }

    public function getKHByID($id)
    {
        // $kh = khachhang::join('don_vi_hanh_chinh as dvhc_huyen', 'dvhc_huyen.ID_DVHC', '=', 'khach_hang.MAHUYEN_KH')
        //     ->join('don_vi_hanh_chinh as dvhc_xa', 'dvhc_xa.ID_DVHC', '=', 'khach_hang.MAXA_KH')
        //     ->where('id_kh', $id)
        //     ->select('*', 'dvhc_huyen.TEN_DVHC as TEN_HUYEN', 'dvhc_xa.TEN_DVHC as TEN_XA')
        //     ->first();

        $kh = khachhang::join('unit as dvhc_huyen', 'dvhc_huyen.code', '=', 'khach_hang.MAHUYEN_KH')
            ->join('unit as dvhc_xa', 'dvhc_xa.code', '=', 'khach_hang.MAXA_KH')
            ->join('unit_village as dvhc_ap', 'dvhc_ap.id', '=', 'khach_hang.MAAP_KH')
            ->where('id_kh', $id)
            ->select('*', 'dvhc_huyen.name as TEN_HUYEN', 'dvhc_xa.name as TEN_XA', 'dvhc_ap.name as TEN_AP')
            ->first();

        if ($kh !== null) {
            return response()->json($kh, 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        }
    }


    public function getKH_ByID_LIX($id)
    {
        $kh = khachhang::where('ID_KH', $id)->first();

        if ($kh !== null) {
            return response()->json($kh, 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        }
    }
}

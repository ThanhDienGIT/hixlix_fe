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
use Maatwebsite\Excel\Excel as ExcelExcel;

class danhsachkhachhang extends Controller
{
    public function exportExcel(Request $request)
    {
        $Data = $request->all();
        $response =  Excel::download(new KhachHangExport($Data), 'khach_hang_data.xlsx', ExcelExcel::CSV);
        return $response;
    }
    public function searchcustomer(Request $request)
    {
        if ($request->keywords !== '') {
            if ($request->status_survey === 5 && $request->quality_survey !== 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<=', 10)
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }

            if ($request->quality_survey === 5 && $request->status_survey !== 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<=', 10)
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }



            if ($request->status_survey === 5 || $request->quality_survey === 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }
            if ($request->status_survey === 0) {

                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }
            if ($request->quality_survey === 0) {

                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '>', 7)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>', 7)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>', 7)
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            } else {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<', 5)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5)
                    ->where(function ($query) use ($request) {
                        $query->where('khach_hang.TEN_KH', 'like', '%' . $request->keywords . '%')
                            ->orWhere('khach_hang.SODIENTHOAI_KH', 'like', '%' . $request->keywords . '%');
                    })
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }
        } else {
            if ($request->status_survey === 5 && $request->quality_survey !== 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<=', 10)
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }

            if ($request->quality_survey === 5 && $request->status_survey !== 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<=', 10)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<=', 10)
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }


            if ($request->status_survey === 5 || $request->quality_survey === 5) {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }
            if ($request->status_survey === 0) {

                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->get();

                return response()->json(['dskh' => $result], 200);
            }
            if ($request->quality_survey === 0) {

                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '>', 7)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '>', 7)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '>', 7)
                    ->get();

                return response()->json(['dskh' => $result], 200);
            } else {
                $result =
                    khachhang::join('phieu_khao_sat', 'phieu_khao_sat.ID_KH', '=', 'khach_hang.ID_KH')
                    ->leftJoin(
                        'chi_tiet_phieu_khao_sat_lix',
                        'chi_tiet_phieu_khao_sat_lix.ID_PKS',
                        '=',
                        'phieu_khao_sat.ID_PKS'
                    )
                    ->where('khach_hang.TRANGTHAI_KH', $request->status_survey)
                    ->where('chi_tiet_phieu_khao_sat_lix.DIEMHAILONG_CTPKS', '<', 5)
                    ->where('chi_tiet_phieu_khao_sat_lix.CAMNHANDICHVU_CTPKS', '<', 5)
                    ->where('chi_tiet_phieu_khao_sat_lix.CANNHANPHUCVU_CTPKS', '<', 5)
                    ->get();

                return response()->json(['dskh' => $result], 200);
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
            ]
        );
        if ($validatedData->passes()) {
            $baohong = $request->BAOHONG_KH == false ? 0 : 1;
            $result = khachhang::where('ID_KH', $request->ID_KH)->update([
                'BAOHONG_KH' => $baohong,
                'CCCD_KH' => $request->CCCD_KH,
                'DIACHI_KH' => $request->DIACHI_KH,
                'MAHUYEN_KH' => $request->MAHUYEN_KH,
                'MAXA_KH' => $request->MAXA_KH,
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
        $survey = phieukhaosat::join('nhan_vien', 'nhan_vien.ID_NV', '=', 'phieu_khao_sat.ID_NV')
            ->join('chi_tiet_phieu_khao_sat_lix', 'chi_tiet_phieu_khao_sat_lix.ID_PKS', '=', 'phieu_khao_sat.ID_PKS')
            ->join('dich_vu', 'dich_vu.ID_DV', '=', 'chi_tiet_phieu_khao_sat_lix.ID_DV')
            ->where('phieu_khao_sat.ID_KH', $id)
            ->where('phieu_khao_sat.ID_NV', auth()->user()->ID_NV)
            ->get();

        if ($survey !== null) {
            return response()->json($survey, 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
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
        $result = donvihanhchinh::where('CAP_DVHC', 2)->where('ID_CHA_DVHC', $id)->get();
        if ($result) {
            return response(['xaphuong' => $result], 200);
        } else {
            return response(['xaphuong' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }
    public function getallquanhuyen()
    {
        $result  = donvihanhchinh::where('CAP_DVHC', 1)->get();
        if ($result) {
            return response(['dvhc' => $result], 200);
        } else {
            return response(['dvhc' => ''], 404);
        }
        return response(['message' => 'Đã có lỗi xảy ra trong lúc lấy dữ liệu DVHC'], 500);
    }
    public function get_danhsachkhachhang($count)
    {

        // $user=auth()->user();
        $id_nv = auth()->user()->ID_NV;

        if ($id_nv) {
            try {
                $DSKH = khachhang::where('id_nv', $id_nv)->paginate($count);
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
            return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        }
    }

    public function getKHByID($id)
    {
        $kh = khachhang::join('don_vi_hanh_chinh as dvhc_huyen', 'dvhc_huyen.ID_DVHC', '=', 'khach_hang.MAHUYEN_KH')
            ->join('don_vi_hanh_chinh as dvhc_xa', 'dvhc_xa.ID_DVHC', '=', 'khach_hang.MAXA_KH')
            ->where('ID_KH', $id)
            ->select('*', 'dvhc_huyen.TEN_DVHC as TEN_HUYEN', 'dvhc_xa.TEN_DVHC as TEN_XA')
            ->first();

        if ($kh !== null) {
            return response()->json($kh, 200);
        } else {
            return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        }
    }
}

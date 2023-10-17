<?php

namespace App\Http\Controllers;

use App\Models\chi_tiet_phieu_khao_sat_lix;
use App\Models\log_chi_tiet_phieu_khao_sat_lix;
use App\Models\phieukhaosat;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Lix extends Controller
{
    public function get_lix(Request $request)
    {
        $user = Auth::user();
        $id_nv = $user->ID_NV;

        if ($id_nv) {
            try {
                $PKS = phieukhaosat::query()->with('chitietpks', 'khachhangs', 'nhanviens')->where('id_nv', $id_nv)->get();
                if ($PKS->isEmpty()) {
                    return response()->json(['message' => 'Không tìm thấy danh sách khách hàng'], 404);
                }
                $PKS_data = [];
                foreach ($PKS as $_PKS) {
                    $pks_item = [
                        'id_nv' => $id_nv,
                        'pks' => $_PKS,
                    ];
                    $PKS_data[] = $pks_item;
                }
                return response()->json($PKS_data, 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        }
    }

    public function add_lix(Request $request)
    {

        // Lấy thông tin người dùng đăng nhập
        // $nhanVien = auth()->user();

        try {
            $arrayCreate = $request->all();

            $arrayInsert = [];
            $now = Carbon::now();
            $user = Auth::user();
            $id_nv = $user->ID_NV;
            foreach ($arrayCreate  as $item) {
                $id_pks = isset($item['id_pks']) ? $item['id_pks'] : null;
                $id_dv = isset($item['id_dv']) ? $item['id_dv'] : null;


                $existingRecord = chi_tiet_phieu_khao_sat_lix::where('id_dv', $id_dv)->first();

                if ($existingRecord) {
                    return response()->json(['message' => 'Dịch vụ đã khảo sát'], 400);
                }
                $diachi_kh = isset($item['diachi_kh']) ? $item['diachi_kh'] : null;
                $tenkhachhangdaidien_ctpks = isset($item['tenkhachhangdaidien_ctpks']) ? $item['tenkhachhangdaidien_ctpks'] : null;
                $sodienthoaikhachhangdaidien_ctpks = isset($item['sodienthoaikhachhangdaidien_ctpks']) ? $item['sodienthoaikhachhangdaidien_ctpks'] : null;
                $accountkhachhang_ctpks = isset($item['accountkhachhang_ctpks']) ? $item['accountkhachhang_ctpks'] : null;
                $muccuoc_ctpks = isset($item['muccuoc_ctpks']) ? $item['muccuoc_ctpks'] : null;
                $hinhthucdong_ctpks = isset($item['hinhthucdong_ctpks']) ? $item['hinhthucdong_ctpks'] : null;
                $ngaybatdaudongcoc_ctpks = isset($item['ngaybatdaudongcoc_ctpks']) ? $item['ngaybatdaudongcoc_ctpks'] : null;
                $ngayketthucdongcoc_ctpks = isset($item['ngayketthucdongcoc_ctpks']) ? $item['ngayketthucdongcoc_ctpks'] : null;
                $nhacungcap_ctpks = isset($item['nhacungcap_ctpks']) ? $item['nhacungcap_ctpks'] : null;
                $diemhailong_ctpks = isset($item['diemhailong_ctpks']) ? $item['diemhailong_ctpks'] : null;
                $camnhandichvu_ctpks = isset($item['camnhandichvu_ctpks']) ? $item['camnhandichvu_ctpks'] : null;
                $camnhanphucvu_ctpks = isset($item['camnhanphucvu_ctpks']) ? $item['camnhanphucvu_ctpks'] : null;
                $ykienkhac = isset($item['ykienkhac']) ? $item['ykienkhac'] : null;
                // $nguoitao_ctpks = isset($item['nguoitao_ctpks']) ? $item['nguoitao_ctpks'] : null;
                $nguoitao_ctpks = $id_nv;
                $ngaytao_ctpks = $now;
                $nguoiupdate_ctpks = isset($item['nguoiupdate_ctpks']) ? $item['nguoiupdate_ctpks'] : null;
                $ngayupdate_ctpks = isset($item['ngayupdate_ctpks']) ? $item['ngayupdate_ctpks'] : null;
                $is_deleted = 0;

                $addlix = [
                    'id_pks' => $id_pks,
                    'id_dv' => $id_dv,
                    'diachi_kh' => $diachi_kh,
                    'tenkhachhangdaidien_ctpks' => $tenkhachhangdaidien_ctpks,
                    'sodienthoaikhachhangdaidien_ctpks' => $sodienthoaikhachhangdaidien_ctpks,
                    'accountkhachhang_ctpks' => $accountkhachhang_ctpks,
                    'muccuoc_ctpks' => $muccuoc_ctpks,
                    'hinhthucdong_ctpks' => $hinhthucdong_ctpks,
                    'ngaybatdaudongcoc_ctpks' => $ngaybatdaudongcoc_ctpks,
                    'ngayketthucdongcoc_ctpks' => $ngayketthucdongcoc_ctpks,
                    'nhacungcap_ctpks' => $nhacungcap_ctpks,
                    'diemhailong_ctpks' => $diemhailong_ctpks,
                    'camnhandichvu_ctpks' => $camnhandichvu_ctpks,
                    'camnhanphucvu_ctpks' => $camnhanphucvu_ctpks,
                    'ykienkhac' => $ykienkhac,
                    'nguoitao_ctpks' => $nguoitao_ctpks,
                    'ngaytao_ctpks' => $ngaytao_ctpks,
                    'nguoiupdate_ctpks' => $nguoiupdate_ctpks,
                    'ngayupdate_ctpks' => $ngayupdate_ctpks,
                    'is_deleted' => $is_deleted
                ];
                $arrayInsert[] = $addlix;
            }
            chi_tiet_phieu_khao_sat_lix::insert($arrayInsert);
            log_chi_tiet_phieu_khao_sat_lix::insert($arrayInsert);
            return response()->json(['message' => 'Thêm khảo sát thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi thêm khảo sát: ' . $e->getMessage()], 500);
        }
    }

    public function update_lix(Request $request)
    {

        // Lấy thông tin người dùng đăng nhập
        // $nhanVien = auth()->user();

        $user = Auth::user();
        $id_nv = $user->ID_NV;

        if ($id_nv) {
            try {
                $arrayCreate = $request->all();
                $arrayInsert = [];
                $now = Carbon::now();
                foreach ($arrayCreate  as $item) {
                    $id_ctpks = isset($item['id_ctpks']) ? $item['id_ctpks'] : null;
                    $id_pks = isset($item['id_pks']) ? $item['id_pks'] : null;
                    $id_dv = isset($item['id_dv']) ? $item['id_dv'] : null;
                    $diachi_kh = isset($item['diachi_kh']) ? $item['diachi_kh'] : null;
                    $tenkhachhangdaidien_ctpks = isset($item['tenkhachhangdaidien_ctpks']) ? $item['tenkhachhangdaidien_ctpks'] : null;
                    $sodienthoaikhachhangdaidien_ctpks = isset($item['sodienthoaikhachhangdaidien_ctpks']) ? $item['sodienthoaikhachhangdaidien_ctpks'] : null;
                    $accountkhachhang_ctpks = isset($item['accountkhachhang_ctpks']) ? $item['accountkhachhang_ctpks'] : null;
                    $muccuoc_ctpks = isset($item['muccuoc_ctpks']) ? $item['muccuoc_ctpks'] : null;
                    $hinhthucdong_ctpks = isset($item['hinhthucdong_ctpks']) ? $item['hinhthucdong_ctpks'] : null;
                    $ngaybatdaudongcoc_ctpks = isset($item['ngaybatdaudongcoc_ctpks']) ? $item['ngaybatdaudongcoc_ctpks'] : null;
                    $ngayketthucdongcoc_ctpks = isset($item['ngayketthucdongcoc_ctpks']) ? $item['ngayketthucdongcoc_ctpks'] : null;
                    $nhacungcap_ctpks = isset($item['nhacungcap_ctpks']) ? $item['nhacungcap_ctpks'] : null;
                    $diemhailong_ctpks = isset($item['diemhailong_ctpks']) ? $item['diemhailong_ctpks'] : null;
                    $camnhandichvu_ctpks = isset($item['camnhandichvu_ctpks']) ? $item['camnhandichvu_ctpks'] : null;
                    $camnhanphucvu_ctpks = isset($item['camnhanphucvu_ctpks']) ? $item['camnhanphucvu_ctpks'] : null;
                    $ykienkhac = isset($item['ykienkhac']) ? $item['ykienkhac'] : null;
                    $nguoitao_ctpks = isset($item['nguoitao_ctpks']) ? $item['nguoitao_ctpks'] : null;
                    $ngaytao_ctpks = isset($item['ngaytao_ctpks']) ? $item['ngaytao_ctpks'] : null;
                    // $nguoiupdate_ctpks = isset($item['nguoiupdate_ctpks']) ? $item['nguoiupdate_ctpks'] : null;
                    $nguoiupdate_ctpks = $id_nv;
                    $ngayupdate_ctpks = $now;
                    $is_deleted = 0;

                    chi_tiet_phieu_khao_sat_lix::where('id_ctpks', $id_ctpks)->update([
                        'id_pks' => $id_pks,
                        'id_dv' => $id_dv,
                        'diachi_kh' => $diachi_kh,
                        'tenkhachhangdaidien_ctpks' => $tenkhachhangdaidien_ctpks,
                        'sodienthoaikhachhangdaidien_ctpks' => $sodienthoaikhachhangdaidien_ctpks,
                        'accountkhachhang_ctpks' => $accountkhachhang_ctpks,
                        'muccuoc_ctpks' => $muccuoc_ctpks,
                        'hinhthucdong_ctpks' => $hinhthucdong_ctpks,
                        'ngaybatdaudongcoc_ctpks' => $ngaybatdaudongcoc_ctpks,
                        'ngayketthucdongcoc_ctpks' => $ngayketthucdongcoc_ctpks,
                        'nhacungcap_ctpks' => $nhacungcap_ctpks,
                        'diemhailong_ctpks' => $diemhailong_ctpks,
                        'camnhandichvu_ctpks' => $camnhandichvu_ctpks,
                        'camnhanphucvu_ctpks' => $camnhanphucvu_ctpks,
                        'ykienkhac' => $ykienkhac,
                        'nguoitao_ctpks' => $nguoitao_ctpks,
                        'ngaytao_ctpks' => $ngaytao_ctpks,
                        'nguoiupdate_ctpks' => $nguoiupdate_ctpks,
                        'ngayupdate_ctpks' => $ngayupdate_ctpks,
                        'is_deleted' => $is_deleted
                    ]);

                    $addlix = [
                        'id_pks' => $id_pks,
                        'id_dv' => $id_dv,
                        'diachi_kh' => $diachi_kh,
                        'tenkhachhangdaidien_ctpks' => $tenkhachhangdaidien_ctpks,
                        'sodienthoaikhachhangdaidien_ctpks' => $sodienthoaikhachhangdaidien_ctpks,
                        'accountkhachhang_ctpks' => $accountkhachhang_ctpks,
                        'muccuoc_ctpks' => $muccuoc_ctpks,
                        'hinhthucdong_ctpks' => $hinhthucdong_ctpks,
                        'ngaybatdaudongcoc_ctpks' => $ngaybatdaudongcoc_ctpks,
                        'ngayketthucdongcoc_ctpks' => $ngayketthucdongcoc_ctpks,
                        'nhacungcap_ctpks' => $nhacungcap_ctpks,
                        'diemhailong_ctpks' => $diemhailong_ctpks,
                        'camnhandichvu_ctpks' => $camnhandichvu_ctpks,
                        'camnhanphucvu_ctpks' => $camnhanphucvu_ctpks,
                        'ykienkhac' => $ykienkhac,
                        'nguoitao_ctpks' => $nguoitao_ctpks,
                        'ngaytao_ctpks' => $ngaytao_ctpks,
                        'nguoiupdate_ctpks' => $nguoiupdate_ctpks,
                        'ngayupdate_ctpks' => $ngayupdate_ctpks,
                        'is_deleted' => $is_deleted
                    ];
                    $arrayInsert[] = $addlix;
                }
                log_chi_tiet_phieu_khao_sat_lix::insert($arrayInsert);
                return response()->json(['message' => 'Cập nhật khảo sát thành công'], 200);
            } catch (\Exception $e) {
                return response()->json(['message' => 'Lỗi khi thêm khảo sát hằng ngày: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        }
    }


    public function delete_lix(Request $request)
    {

        // Lấy thông tin người dùng đăng nhập
        // $nhanVien = auth()->user();

        try {
            $arrayCreate = $request->all();
            foreach ($arrayCreate  as $item) {
                $id_ctpks = isset($item['id_ctpks']) ? $item['id_ctpks'] : null;

                chi_tiet_phieu_khao_sat_lix::where('id_ctpks', $id_ctpks)->update([
                    'is_deleted' => 1
                ]);
            }

            return response()->json(['message' => 'Xoá khảo sát thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xoá khảo sát: ' . $e->getMessage()], 500);
        }
    }
}

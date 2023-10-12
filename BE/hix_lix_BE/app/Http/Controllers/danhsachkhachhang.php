<?php

namespace App\Http\Controllers;

use App\Models\khachhang;
use Illuminate\Http\Request;

class danhsachkhachhang extends Controller
{
    public function get_danhsachkhachhang(Request $request)
    {


        // $user=auth()->user();

        $id_nv = $request->id_nv;

        if ($id_nv) {
            try {

                $DSKH = khachhang::where('id_nv', $id_nv)->get();

                if ($DSKH->isEmpty()) {
                    return response()->json(['message' => 'Không tìm thấy danh sách khách hàng'], 404);
                }
                $DSKH_data = [];

                foreach ($DSKH as $_DSKH) {
                    $dskh_item = [
                        'id_nv' => $id_nv,
                        'danhsachkhachhang' => $_DSKH,
                    ];
                    $DSKH_data[] = $dskh_item;
                }
                return response()->json($DSKH_data, 200);
            } catch (\Throwable $th) {
                return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $th->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        }
    }

    // public function get_CV_BC_HangNgay()
    // {
    //     // Lấy danh sách các báo cáo hàng ngày kèm thông tin công việc, nhân viên, nhân viên người duyệt và loại công việc
    //     $user = auth()->user();

    //     if (!$user) {
    //         return response()->json(['message' => 'Người dùng chưa đăng nhập'], 401);
    //     }

    //     try {
    //         // Lấy thông tin nhân viên dựa trên user_id của người dùng đang đăng nhập
    //         $userId = $user->nv_id;
    //         $nhanVien = NhanVien::find($userId);

    //         // Kiểm tra nếu không tìm thấy nhân viên
    //         if (!$nhanVien) {
    //             return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
    //         }
    //         $chucVuNhanVien = $nhanVien->nv_quyen;
    //         $quyenThamDinh = $nhanVien->nv_quyenthamdinh;

    //         $baoCaos = BaoCaoHangNgay::query()->with('congViecs', 'nhanVien', 'nhanVienDuyet');



    //         if ($chucVuNhanVien === 'ld' && $quyenThamDinh == 1) {
    //             // Hiển thị toàn bộ bảng kế hoạch và danh sách công việc của giám đốc
    //             $baoCaos = $baoCaos->get();
    //         } elseif ($chucVuNhanVien === 'nv' && $quyenThamDinh == 1) {
    //             // Hiển thị kế hoạch trừ kế hoạch của giám đốc và hiển thị hết công việc trừ công việc của giám đốc
    //             $baoCaos = $baoCaos->whereHas('nhanVien', function ($query) {
    //                 $query->where('nv_quyen', '!=', 'ld');
    //             })->get();
    //         } elseif ($chucVuNhanVien === 'nv' && $quyenThamDinh == 0) {
    //             // Hiển thị công việc của chính nhân viên đó
    //             $baoCaos = $baoCaos->where('nv_id', $userId)->get();
    //             // dd($baoCaos);
    //         } else {
    //             // Xử lý trường hợp quyền không hợp lệ (nếu cần thiết)
    //             return response()->json(['message' => 'Quyền không hợp lệ'], 403);
    //         }

    //         // Kiểm tra nếu không có báo cáo nào
    //         if ($baoCaos->isEmpty()) {

    //             return response()->json(['message' => 'Không có báo cáo hàng ngày'], 404);
    //         }
    //         $ngayhientai = Carbon::now()->format('d-m-Y');
    //         // Tạo một mảng chứa thông tin các báo cáo hàng ngày
    //         $baoCaoData = [];
    //         foreach ($baoCaos as $baoCao) {

    //             // Lấy thông tin công việc
    //             $congViec = $baoCao->congViecs;

    //             // Lấy thông tin nhân viên
    //             $nhanVien = $baoCao->nhanVien;
    //             // Lấy thông tin nhân viên người duyệt
    //             $nhanVienDuyet = $baoCao->nhanVienDuyet;

    //             $duan= $baoCao->congViecs->duAns;


    //             $cv_cvcha= $congViec->cv_cvcha;

    //             $tencvcha= CongViec::where('cv_id',$cv_cvcha)->first();


    //             if ($tencvcha->cv_cvcha != null) {
    //                 // dd($tencvcha->cv_noidung);
    //                 $baoCaoItem = [
    //                     'bchn_id' => $baoCao->bchn_id,
    //                     'cv_id' => $baoCao->cv_id,
    //                     'bchn_tiendo' => $baoCao->bchn_tiendo,
    //                     'da_ten'=>$duan->da_ten,
    //                     'bchn_trangthai' => $baoCao->bchn_trangthai,
    //                     'bchn_ngay' => date('Y-m-d', strtotime($baoCao->bchn_ngay)),
    //                     'bchn_ngay2' => date('Y-m-d', strtotime($baoCao->bchn_ngay)),
    //                     'bchn_noidung' => $baoCao->bchn_noidung,
    //                     'so_gio_lam' => $baoCao->so_gio_lam,
    //                     'bchn_giobatdau' => $baoCao->bchn_giobatdau,
    //                     'bchn_gioketthuc' => $baoCao->bchn_gioketthuc,
    //                     'bchn_giothamdinh' => $baoCao->bchn_giothamdinh,
    //                     'bchn_ghichu' => $baoCao->bchn_ghichu,
    //                     'bchn_ngayhientai' => $ngayhientai,
    //                     'cong_viec' => [
    //                         'loaicongviec' => $congViec->loaiCongViecs,
    //                         'ten_cong_viec' => $congViec->cv_ten,
    //                         'cv_sanphamhoanthanh' => $congViec->cv_sanphamhoanthanh,
    //                         'cv_trongso' => $congViec->cv_trongso,
    //                         'cv_ma_cv' => $congViec->cv_ma_cv,
    //                         'id_raci' => $congViec->id_raci,
    //                         'cv_noidung' => $congViec->cv_noidung,
    //                         'cv_id' => $congViec->cv_id,
    //                         'cv_noidung_cvcha' => $tencvcha->cv_noidung,
    //                     ],
    //                     'nhan_vien' => $nhanVien ? [
    //                         'ten_nhan_vien' => $nhanVien->nv_ten,

    //                     ] : null,
    //                     'ng_duyet' => $nhanVienDuyet ? [
    //                         'ten_nguoi_duyet' => $nhanVienDuyet->nv_ten,
    //                     ] : null,
    //                 ];

    //                 // Thêm báo cáo hàng ngày vào mảng chứa thông tin
    //                 $baoCaoData[] = $baoCaoItem;
    //             }

    //             // Tạo một mảng chứa thông tin của báo cáo hàng ngày
    //             // $baoCaoItem = [
    //             //     'bchn_id' => $baoCao->bchn_id,
    //             //     'cv_id' => $baoCao->cv_id,
    //             //     'bchn_tiendo' => $baoCao->bchn_tiendo,
    //             //     'da_ten'=>$duan->da_ten,
    //             //     'bchn_trangthai' => $baoCao->bchn_trangthai,
    //             //     'bchn_ngay' => date('Y-m-d', strtotime($baoCao->bchn_ngay)),
    //             //     'bchn_ngay2' => date('Y-m-d', strtotime($baoCao->bchn_ngay)),
    //             //     'bchn_noidung' => $baoCao->bchn_noidung,
    //             //     'so_gio_lam' => $baoCao->so_gio_lam,
    //             //     'bchn_giobatdau' => $baoCao->bchn_giobatdau,
    //             //     'bchn_gioketthuc' => $baoCao->bchn_gioketthuc,
    //             //     'bchn_giothamdinh' => $baoCao->bchn_giothamdinh,
    //             //     'bchn_ghichu' => $baoCao->bchn_ghichu,
    //             //     'bchn_ngayhientai' => $ngayhientai,
    //             //     'cong_viec' => [
    //             //         'loaicongviec' => $congViec->loaiCongViecs,
    //             //         'ten_cong_viec' => $congViec->cv_ten,
    //             //         'cv_sanphamhoanthanh' => $congViec->cv_sanphamhoanthanh,
    //             //         'cv_trongso' => $congViec->cv_trongso,
    //             //         'cv_ma_cv' => $congViec->cv_ma_cv,
    //             //         'id_raci' => $congViec->id_raci,
    //             //         'cv_noidung' => $congViec->cv_noidung,
    //             //         'cv_id' => $congViec->cv_id,
    //             //         'cv_cvcha' => $tencvcha,
    //             //     ],
    //             //     'nhan_vien' => $nhanVien ? [
    //             //         'ten_nhan_vien' => $nhanVien->nv_ten,

    //             //     ] : null,
    //             //     'ng_duyet' => $nhanVienDuyet ? [
    //             //         'ten_nguoi_duyet' => $nhanVienDuyet->nv_ten,
    //             //     ] : null,
    //             // ];

    //             // // Thêm báo cáo hàng ngày vào mảng chứa thông tin
    //             // $baoCaoData[] = $baoCaoItem;
    //     }

    //         // Trả về dữ liệu báo cáo hàng ngày
    //         return response()->json($baoCaoData, 200);
    //     } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
    //         return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'Lỗi khi lấy thông tin chức vụ nhân viên: ' . $e->getMessage()], 500);
    //     }
    // }
}

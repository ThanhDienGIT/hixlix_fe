<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class NhanVienController extends Controller
{
    public function addStaff(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'ten_nv' => 'required',
                'sdt_nv' => [
                    'required',
                    'numeric',
                    'digits:10',
                ],
                'diachi_nv' => 'required',
                'email_nv' => 'required|email',
                'chucvu_nv' => 'required',
                'taikhoan_nv' => 'required',
                'matkhau_nv' => 'required',
            ],
            [
                'ten_nv.required' => 'Vui lòng nhập tên nhân viên',
                'sdt_nv.required' => 'Vui lòng nhập SĐT nhân viên',
                'sdt_nv.numeric' => 'Vui lòng nhập SĐT nhân viên là số',
                'sdt_nv.digits' => 'Vui lòng nhập SĐT nhân viên tối đa 10 số',
                'diachi_nv.required' => 'Vui lòng nhập địa chỉ nhân viên',
                'email_nv.required' => 'Vui lòng nhập email nhân viên và kiêm tra đúng định dạng',
                'chucvu_nv.numeric' => 'Vui lòng chọn chức vụ nhân viên',
                'taikhoan_nv.digits' => 'Vui lòng nhập tài khoản nhân viên',
                'matkhau_nv.required' => 'Vui lòng nhập mật khẩu nhân viên',
            ]
        );
        if ($validatedData->passes()) {
            $count  = DB::table('nhan_vien')
                        ->where('taikhoan_nv', $request->taikhoan_nv)
                        ->count();
            if ($count != 0) {
                return response()->json(['status' => 'failed', 'message' => 'Tài khoản đã tồn tại'], 400);
            } else {
                $result = DB::table('nhan_vien')->insert([
                    'ten_nv' => $request->ten_nv,
                    'sdt_nv' => $request->sdt_nv,
                    'diachi_nv' => $request->diachi_nv,
                    'email_nv' => $request->email_nv,
                    'chucvu_nv' => $request->chucvu_nv,
                    'taikhoan_nv' => $request->taikhoan_nv,
                    'matkhau_nv' => Hash::make($request->matkhau_nv),
                    'is_Deleted' => 0
                ]);
                return response()->json(['status' => 'okkk', 'message' => 'Thêm thành công'], 200);

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

    public function updateStaff(Request $request)
    {
        $request->all();
        $result = DB::table('nhan_vien')
                    ->where('id_nv', $request->id_nv)
                    ->update([
                    'ten_nv' => $request->ten_nv,
                    'sdt_nv' => $request->sdt_nv,
                    'diachi_nv' => $request->diachi_nv,
                    'email_nv' => $request->email_nv,
                    'chucvu_nv' => $request->chucvu_nv,
                    'matkhau_nv' => Hash::make($request->matkhau_nv),
                    ]);
                
                return response()->json(['status' => 'okkk', 'message' => 'Cập nhật thành công'], 200);
    }

    public function deleteStaff(Request $request)
    {
        $request->all();
        $result = DB::table('nhan_vien')
                    ->where('id_nv', $request->id_nv)
                    ->update([
                    'is_deleted' => true,
                    ]);
                return response()->json(['status' => 'okkk', 'message' => 'Xóa thành công'], 200);
    }

    public function getAllStaff()
    {
        $result = DB::table('nhan_vien')
                    ->get();
                return response()->json($result, 200);
    }

    public function getStaffById(Request $request)
    {
        $request->all();
        $result = DB::table('nhan_vien')
                    ->where('id_nv', $request->id_nv)
                    ->get();
                return response()->json($result, 200);
    }
}

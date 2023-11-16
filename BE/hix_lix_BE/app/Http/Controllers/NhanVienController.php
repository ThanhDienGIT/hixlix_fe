<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class NhanVienController extends Controller
{
    public function search($count, Request $request)
    {
        if (!empty($request->keywords)) {

            $user = DB::table('nhan_vien')
                ->where('TEN_NV', 'like', '%' . $request->keywords . '%')
                ->orWhere('SDT_NV', 'like', '%' . $request->keywords . '%')
                ->orWhere('DIACHI_NV', 'like', '%' . $request->keywords . '%')
                ->orWhere('EMAIL_NV', 'like', '%' . $request->keywords . '%')
                ->orWhere('TAIKHOAN_NV', 'like', '%' . $request->keywords . '%');

            if ($request->TRANGTHAI_NV !== 5) {
                $user->where('nhan_vien.TRANGTHAI_NV', $request->TRANGTHAI_NV);
            }

            if ($request->CHUCVU_NV !== 5) {
                $user->where('nhan_vien.CHUCVU_NV', $request->CHUCVU_NV);
            }

            $user = $user->selectRaw('CHUCVU_NV, DIACHI_NV, EMAIL_NV, ID_NV, IS_DELETED, SDT_NV, TAIKHOAN_NV, TEN_NV, TRANGTHAI_NV')
                ->paginate($count);
            return response()->json(['dsuser' => $user], 200);
        } else {
            $user = DB::table('nhan_vien');

            if ($request->TRANGTHAI_NV !== 5) {
                $user->where('nhan_vien.TRANGTHAI_NV', $request->TRANGTHAI_NV);
            }

            if ($request->CHUCVU_NV !== 5) {
                $user->where('nhan_vien.CHUCVU_NV', $request->CHUCVU_NV);
            }

            $user = $user->selectRaw('CHUCVU_NV, DIACHI_NV, EMAIL_NV, ID_NV, IS_DELETED, SDT_NV, TAIKHOAN_NV, TEN_NV, TRANGTHAI_NV')
                ->paginate($count);
            return response()->json(['dsuser' => $user], 200);
        }
    }
    public function addStaff(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_NV' => 'required',
                'SDT_NV' => [
                    'required',
                    'numeric',
                    'digits:10',
                    Rule::unique('nhan_vien', 'SDT_NV')
                ],
                'DIACHI_NV' => 'required',
                'EMAIL_NV' => ['required', 'email', Rule::unique('nhan_vien', 'EMAIL_NV')],
                'CHUCVU_NV' => 'required',
                'TAIKHOAN_NV' => ['required', Rule::unique('nhan_vien', 'TAIKHOAN_NV')],
                'MATKHAU_NV' => 'required',
            ],
            [
                'TEN_NV.required' => 'Vui lòng nhập tên nhân viên',
                'SDT_NV.required' => 'Vui lòng nhập SĐT nhân viên',
                'SDT_NV.numeric' => 'Vui lòng nhập SĐT nhân viên là số',
                'SDT_NV.digits' => 'Vui lòng nhập SĐT nhân viên tối đa 10 số',
                'SDT_NV.unique' => 'Vui lòng nhập SĐT không trùng trong hệ thống',
                'DIACHI_NV.required' => 'Vui lòng nhập địa chỉ nhân viên',
                'email_nv.required' => 'Vui lòng nhập email nhân viên và kiêm tra đúng định dạng',
                'EMAIL_NV.email' => 'Vui lòng nhập đúng định dạng Email',
                'EMAIL_NV.unique' => 'Vui lòng nhập Email không trùng trong hệ thống',
                'CHUCVU_NV.required' => 'Vui lòng chọn chức vụ nhân viên',
                'TAIKHOAN_NV.required' => 'Vui lòng nhập tài khoản nhân viên',
                'TAIKHOAN_NV.unique' => 'Vui lòng nhập tài khoản nhân viên không trùng trong hệ thống',
                'MATKHAU_NV.required' => 'Vui lòng nhập mật khẩu nhân viên'
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('nhan_vien')->insert([
                'ten_nv' => $request->TEN_NV,
                'sdt_nv' => $request->SDT_NV,
                'diachi_nv' => $request->DIACHI_NV,
                'email_nv' => $request->EMAIL_NV,
                'chucvu_nv' => $request->CHUCVU_NV,
                'taikhoan_nv' => $request->TAIKHOAN_NV,
                'matkhau_nv' => Hash::make($request->MATKHAU_NV),
                'is_deleted' => 0
            ]);
            return response()->json(['status' => 'success', 'message' => 'Thêm người dùng thành công'], 201);
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

    public function updateStaff($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_NV' => 'required',
                'SDT_NV' => [
                    'required',
                    'numeric',
                    'digits:10',
                    Rule::unique('nhan_vien', 'SDT_NV')->ignore($id, 'ID_NV')
                ],
                'DIACHI_NV' => 'required',
                'EMAIL_NV' => ['required', 'email', Rule::unique('nhan_vien', 'EMAIL_NV')->ignore($id, 'ID_NV')],
                'CHUCVU_NV' => 'required',
                'TAIKHOAN_NV' => ['required', Rule::unique('nhan_vien', 'TAIKHOAN_NV')->ignore($id, 'ID_NV')],
                'MATKHAU_NV' => 'required',
            ],
            [
                'TEN_NV.required' => 'Vui lòng nhập tên nhân viên',
                'SDT_NV.required' => 'Vui lòng nhập SĐT nhân viên',
                'SDT_NV.numeric' => 'Vui lòng nhập SĐT nhân viên là số',
                'SDT_NV.digits' => 'Vui lòng nhập SĐT nhân viên tối đa 10 số',
                'SDT_NV.unique' => 'Vui lòng nhập SĐT không trùng trong hệ thống',
                'DIACHI_NV.required' => 'Vui lòng nhập địa chỉ nhân viên',
                'email_nv.required' => 'Vui lòng nhập email nhân viên và kiêm tra đúng định dạng',
                'EMAIL_NV.email' => 'Vui lòng nhập đúng định dạng Email',
                'EMAIL_NV.unique' => 'Vui lòng nhập Email không trùng trong hệ thống',
                'CHUCVU_NV.required' => 'Vui lòng chọn chức vụ nhân viên',
                'TAIKHOAN_NV.required' => 'Vui lòng nhập tài khoản nhân viên',
                'TAIKHOAN_NV.unique' => 'Vui lòng nhập tài khoản nhân viên không trùng trong hệ thống',
                'MATKHAU_NV.required' => 'Vui lòng nhập mật khẩu nhân viên'
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('nhan_vien')->where('ID_NV', $id)->update([
                'ten_nv' => $request->TEN_NV,
                'sdt_nv' => $request->SDT_NV,
                'diachi_nv' => $request->DIACHI_NV,
                'email_nv' => $request->EMAIL_NV,
                'chucvu_nv' => $request->CHUCVU_NV,
                'taikhoan_nv' => $request->TAIKHOAN_NV,
                'trangthai_nv' => $request->TRANGTHAI_NV
            ]);
            return response()->json(['status' => 'success', 'message' => 'Cập nhật người dùng thành công'], 201);
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

    public function deleteStaff($id)
    {
        $result = DB::table('nhan_vien')
            ->where('ID_NV', $id)
            ->update([
                'IS_DELETED' => 1
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa người dùng thành công'], 201);
    }

    public function getAllStaff($count)
    {
        $result = DB::table('nhan_vien')->where('IS_DELETED', 0)
            ->selectRaw('CHUCVU_NV, DIACHI_NV, EMAIL_NV, ID_NV, IS_DELETED, SDT_NV, TAIKHOAN_NV, TEN_NV, TRANGTHAI_NV')
            ->paginate($count);
        return response()->json($result, 200);
    }

    public function getStaffById($id)
    {
        $result = DB::table('nhan_vien')
            ->where('ID_NV', $id)
            ->first();
        return response()->json($result, 200);
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DichVuController extends Controller
{
    public function themDichVu(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'ten_dv' => 'required',
                'id_ldv' => 'required',
            ],
            [
                'ten_dv.required' => 'Vui lòng nhập tên dịch vụ',
                'id_ldv.required' => 'Vui lòng chọn loại dịch vụ',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('dich_vu')->insert([
                'ten_dv' => $request->ten_dv,
                'id_ldv' => $request->id_ldv,
                'trangthai_dv' => 1,
                'is_Deleted' => 0
            ]);
            return response()->json(['status' => 'okkk', 'message' => 'Thêm thành công'], 200);
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

    public function capNhatDichVu(Request $request)
    {
        $request->all();
        $result = DB::table('dich_vu')
                    ->where('id_dv', $request->id_dv)
                    ->update([
                    'ten_dv' => $request->ten_dv,
                    'id_ldv' => $request->id_ldv,
                    'trangthai_dv' => $request->trangthai_dv,
                    ]);
                
                return response()->json(['status' => 'okkk', 'message' => 'Cập nhật thành công'], 200);
    }

    public function xoaDichVu(Request $request)
    {
        $request->all();
        $result = DB::table('dich_vu')
                    ->where('id_dv', $request->id_dv)
                    ->update([
                        'is_deleted' => true,
                    ]);
        return response()->json(['status' => 'okkk', 'message' => 'Xóa thành công'], 200);
    }

    public function getAllServices()
    {
        $result = DB::table('dich_vu')
                    ->get();
                return response()->json($result, 200);
    }

    public function getServiceById(Request $request)
    {
        $request->all();
        $result = DB::table('dich_vu')
                    ->where('id_dv', $request->id_dv)
                    ->get();
                return response()->json($result, 200);
    }
}

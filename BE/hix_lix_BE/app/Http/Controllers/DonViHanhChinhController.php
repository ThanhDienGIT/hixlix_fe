<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DonViHanhChinhController extends Controller
{
    public function themDonViHanhChinh(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'ten_dvhc' => 'required',
                'cap_dvhc' => 'required',
                'id_cha_dvhc' => 'required',
            ],
            [
                'ten_dvhc.required' => 'Vui lòng nhập tên đơn vị hành chính',
                'cap_dvhc.required' => 'Vui lòng chọn cấp',
                'id_cha_id_cha_dvhcdvhv.required' => 'Vui lòng chọn đơn vị cha',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('don_vi_hanh_chinh')->insert([
                'ten_dvhc' => $request->ten_dvhc,
                'cap_dvhc' => $request->cap_dvhc,
                'id_cha_dvhc' => $request->id_cha_dvhc,
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

    public function capNhatDonViHanhChinh(Request $request)
    {
        $request->all();
        $result = DB::table('don_vi_hanh_chinh')
                    ->where('id_dvhc', $request->id_dvhc)
                    ->update([
                        'ten_dvhc' => $request->ten_dvhc,
                        'cap_dvhc' => $request->cap_dvhc,
                        'id_cha_dvhc' => $request->id_cha_dvhc,
                    ]);
                
                return response()->json(['status' => 'okkk', 'message' => 'Cập nhật thành công'], 200);
    }

    public function xoaDonViHanhChinh(Request $request)
    {
        $request->all();
        $result = DB::table('don_vi_hanh_chinh')
                    ->where('id_dvhc', $request->id_dvhc)
                    ->update([
                        'is_deleted' => true,
                    ]);
        return response()->json(['status' => 'okkk', 'message' => 'Xóa thành công'], 200);
    }

    public function getAllDonViHanhChinh()
    {
        $result = DB::table('don_vi_hanh_chinh')
                    ->get();
                return response()->json($result, 200);
    }

    public function getDonViHanhChinhById(Request $request)
    {
        $request->all();
        $result = DB::table('don_vi_hanh_chinh')
                    ->where('id_dvhc', $request->id_dvhc)
                    ->get();
                return response()->json($result, 200);
    }
}

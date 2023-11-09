<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DichVuController extends Controller
{
    public function dsnhacungcap()
    {
        $dsnhacungcap = DB::table('nha_cung_cap')->get();
        return response()->json($dsnhacungcap);
    }
    public function searchsp(Request $request)
    {
        if (!empty($request->keywords)) {

            $sp = DB::table('nha_cung_cap')
                ->where('TEN_NCC', 'like', '%' . $request->keywords . '%');

            $sp = $sp->get();
            return response()->json(['dsspl' => $sp], 200);
        } else {
            $sp = DB::table('nha_cung_cap');


            $sp = $sp->get();
            return response()->json(['dsspl' => $sp], 200);
        }
    }
    public function search(Request $request)
    {
        if (!empty($request->keywords)) {

            $dv = DB::table('dich_vu')
                ->join('loai_dich_vu', 'loai_dich_vu.ID_LDV', '=', 'dich_vu.ID_LDV')
                ->where('TEN_DV', 'like', '%' . $request->keywords . '%');

            if ($request->LOAI_DV !== 0) {
                $dv->where('dich_vu.ID_LDV', $request->LOAI_DV);
            }

            $dv = $dv->get();
            return response()->json(['dsdv' => $dv], 200);
        } else {
            $dv = DB::table('dich_vu')->join('loai_dich_vu', 'loai_dich_vu.ID_LDV', '=', 'dich_vu.ID_LDV');

            if ($request->LOAI_DV !== 0) {
                $dv->where('dich_vu.ID_LDV', $request->LOAI_DV);
            }

            $dv = $dv->get();
            return response()->json(['dsdv' => $dv], 200);
        }
    }
    public function themDichVu(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'ID_LDV' => 'required',
                'TEN_DV' => 'required',
            ],
            [
                'TEN_DV.required' => 'Vui lòng nhập tên dịch vụ',
                'ID_LDV.required' => 'Vui lòng chọn loại dịch vụ',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('dich_vu')->insert([
                'TEN_DV' => $request->TEN_DV,
                'ID_LDV' => $request->ID_LDV,
                'TRANGTHAI_DV' => 1,
                'IS_DELETED' => 0
            ]);
            return response()->json(['status' => 'success', 'message' => 'Thêm dịch vụ thành công'], 201);
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
    public function addSupplier(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_NCC' => 'required',
            ],
            [
                'TEN_NCC.required' => 'Vui lòng nhập tên nhà cung cấp'
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('nha_cung_cap')->insert([
                'TEN_NCC' => $request->TEN_NCC,
                'GHICHU_NCC' => $request->GHICHU_NCC
            ]);
            return response()->json(['status' => 'success', 'message' => 'Thêm nhà cung cấp thành công'], 201);
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

    public function updateSupplier($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_NCC' => 'required',
            ],
            [
                'TEN_NCC.required' => 'Vui lòng nhập tên nhà cung cấp'
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('nha_cung_cap')->where('ID_NCC', $id)->update([
                'TEN_NCC' => $request->TEN_NCC,
                'GHICHU_NCC' => $request->GHICHU_NCC
            ]);
            return response()->json(['status' => 'success', 'message' => 'Cập nhật nhà cung cấp thành công'], 201);
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

    public function capNhatDichVu($id, Request $request)
    {


        $validatedData = Validator::make(
            $request->all(),
            [
                'ID_LDV' => 'required',
                'TEN_DV' => 'required',
            ],
            [
                'TEN_DV.required' => 'Vui lòng nhập tên dịch vụ',
                'ID_LDV.required' => 'Vui lòng chọn loại dịch vụ',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('dich_vu')
                ->where('ID_DV', $id)
                ->update([
                    'TEN_DV' => $request->TEN_DV,
                    'ID_LDV' => $request->ID_LDV
                ]);
            return response()->json(['status' => 'success', 'message' => 'Cập nhật dịch vụ thành công'], 201);
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

    public function xoaDichVu($id)
    {
        $result = DB::table('dich_vu')
            ->where('ID_DV', $id)
            ->update([
                'IS_DELETED' => 1,
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa dịch vụ thành công'], 201);
    }
    public function deletesupplier($id)
    {
        $result = DB::table('nha_cung_cap')
            ->where('ID_NCC', $id)
            ->update([
                'IS_DELETED' => 1,
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa nhà cung cấp thành công'], 201);
    }
    

    public function getAllServices($count)
    {
        $result = DB::table('dich_vu')
            ->join('loai_dich_vu', 'loai_dich_vu.ID_LDV', '=', 'dich_vu.ID_LDV')
            ->where(
                'is_deleted',
                0
            )
            ->paginate($count);
        return response()->json($result, 200);
    }
    public function get_danhsachnhacungcap($count)
    {
        $result = DB::table('nha_cung_cap')
            ->where(
                'is_deleted',
                0
            )
            ->paginate($count);
        return response()->json($result, 200);
    }
    public function getServiceType()
    {
        $result = DB::table('loai_dich_vu')->get();
        return response()->json($result, 200);
    }

    public function getServiceById($id)
    {
        $result = DB::table('dich_vu')
            ->join('loai_dich_vu', 'dich_vu.ID_LDV', '=', 'loai_dich_vu.ID_LDV')
            ->where('ID_DV', $id)
            ->first();
        return response()->json($result, 200);
    }
    public function getSpByID($id)
    {
        $result = DB::table('nha_cung_cap')
            ->where('ID_NCC', $id)
            ->first();
        return response()->json($result, 200);
    }
}

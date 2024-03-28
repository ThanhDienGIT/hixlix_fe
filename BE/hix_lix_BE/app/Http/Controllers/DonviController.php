<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DonviController extends Controller
{
    public function addLocalityManagement($id, Request $request)
    {
        $listDiaBan = $request->HUYEN;

        // Lấy danh sách địa bàn quản lý hiện tại của đơn vị
$currentDiaBan = DB::table('dia_ban_quan_ly')
->where('DONVI_ID', $id)
->pluck('TENDIABAN')
->toArray();



// So sánh danh sách địa bàn mới với danh sách địa bàn hiện tại của đơn vị
$deleteDiaBan = array_diff($currentDiaBan, $listDiaBan);

if ($deleteDiaBan)
{
    foreach($deleteDiaBan as $deleteDB)
    {
        $result = DB::table('dia_ban_quan_ly')
        ->where('TENDIABAN', $deleteDB)
        ->where('DONVI_ID', $id)
        ->delete();
    }
}

        foreach ($listDiaBan as $diaban) {
            $diaban = DB::table('unit')
                ->where('name', $diaban)
                ->where('parent_code', '93')
                ->first();

            $checkIfExist = DB::table('dia_ban_quan_ly')
                ->where('DONVI_ID', $id)
                ->where('DIABAN_ID', $diaban->code)
                ->where('TENDIABAN', $diaban->name)
                ->first();

            if ($checkIfExist) {
                $result = DB::table('dia_ban_quan_ly')
                    ->where('DONVI_ID', $id)
                    ->where('DIABAN_ID', $diaban->code)
                    ->where('TENDIABAN', $diaban->name)
                    ->update([
                        'DIABAN_ID' => $diaban->code,
                        'TENDIABAN' => $diaban->name
                    ]);
            } else {
                $result = DB::table('dia_ban_quan_ly')
                    ->insert([
                        'DONVI_ID' => $id,
                        'DIABAN_ID' => $diaban->code,
                        'TENDIABAN' => $diaban->name
                    ]);
            }
        }
        if ($result) {
            return response()->json(['status' => 'success', 'message' => 'Cập nhật địa bàn quản lý của đơn vị thành công'], 201);
        } else {
            return response()->json(['status' => 'success', 'message' => 'Cập nhật địa bàn quản lý của đơn vị thành công'], 201);
        }
    }
    public function getAllUnitByID($id)
    {
        $result = DB::table('don_vi')
            ->where('don_vi.DONVI_ID', $id)
            ->first();

        $diaban = DB::table('dia_ban_quan_ly')
            ->select('dia_ban_quan_ly.TENDIABAN')
            ->where('dia_ban_quan_ly.DONVI_ID', $id)
            ->pluck('TENDIABAN')
            ->toArray();
        return response()->json(['result' => $result, 'diaban' => $diaban], 200);
    }
    public function search($count, Request $request)
    {
        if (!empty($request->keywords)) {


            // tìm kiếm cha sau đó tìm kiếm con
            $svqlt = DB::table('don_vi')
                ->where(function ($query) use ($request) {
                    $query
                        ->where('TEN_DONVI', 'like', '%' . $request->keywords . '%')
                        ->orWhere('DIACHI', 'like', '%' . $request->keywords . '%')
                        ->orWhere('SDT_DONVI', 'like', '%' . $request->keywords . '%');
                })
                ->whereNull('DONVICHA')
                ->where('IS_DELETED', 0)
                ->paginate($count);

            $childResults = [];
            foreach ($svqlt as $service) {
                $ID = $service->DONVI_ID;

                $result = DB::table('don_vi')
                    ->where('DONVICHA', $ID)
                    ->where('IS_DELETED', 0)
                    ->whereNotNull('DONVICHA')
                    ->get();

                $childResults = $result;
            }

            // tìm kiếm con sau đó tìm ngược lại cha
            $childresult = DB::table('don_vi')
                ->where(function ($query) use ($request) {
                    $query
                        ->where('TEN_DONVI', 'like', '%' . $request->keywords . '%')
                        ->orWhere('DIACHI', 'like', '%' . $request->keywords . '%')
                        ->orWhere('SDT_DONVI', 'like', '%' . $request->keywords . '%');
                })
                ->where('IS_DELETED', 0)
                ->whereNotNull('DONVICHA')
                ->get();

            $parentResult = [];
            foreach ($childresult as $child) {
                $ID = $child->DONVICHA;

                $result_second = DB::table('don_vi')
                    ->where('DONVI_ID', $ID)
                    ->whereNull('DONVICHA')
                    ->where('IS_DELETED', 0)
                    ->paginate($count);

                $parentResult = $result_second;
            }

            return response()->json([
                'dssvqlt' => $svqlt, 'child' => $childResults,
                'childResult' => $childresult, 'parentResult' => $parentResult
            ], 200);
        } else {
            $svqlt = DB::table('don_vi')
                ->where('IS_DELETED', 0)
                ->whereNull('DONVICHA');
            $result = DB::table('don_vi')
                ->where('IS_DELETED', 0)
                ->whereNotNull('DONVICHA')
                ->get();
            $svqlt = $svqlt->paginate($count);
            return response()->json([
                'dssvqlt' => $svqlt, 'child' => $result,
                'childResult' => [], 'parentResult' => []
            ], 200);
        }
    }
    public function updateUnit($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_DONVI' => 'required',
                'QUANHUYEN' => 'required',
                'XAPHUONG' => 'required',
                'AP_KV' => 'required',
                'SDT_DONVI' => [
                    'numeric',
                    // 'digits:10',
                    Rule::unique('don_vi', 'SDT_DONVI')->ignore($id, 'DONVI_ID')
                ],
            ],
            [
                'TEN_DONVI.required' => 'Vui lòng nhập tên đơn vị',
                'QUANHUYEN.required' => 'Vui lòng chọn quận/huyện của đơn vị',
                'XAPHUONG.required' => 'Vui lòng chọn xã/phường của đơn vị',
                'AP_KV.required' => 'Vui lòng chọn ấp/khu vực của đơn vị',
                'SDT_DONVI.numeric' => 'Vui lòng nhập SĐT đơn vị là số',
                'SDT_DONVI.unique' => 'Vui lòng nhập SĐT không trùng trong hệ thống',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('don_vi')->where('DONVI_ID', $id)->update([
                'TEN_DONVI' => $request->TEN_DONVI,
                'DONVICHA' => $request->DONVICHA === 0 ? null : $request->DONVICHA,
                'QUANHUYEN' => $request->QUANHUYEN,
                'XAPHUONG' => $request->XAPHUONG,
                'AP_KV' => $request->AP_KV,
                'DIACHI' => $request->DIACHI,
                'SDT_DONVI' => $request->SDT_DONVI
            ]);
            return response()->json(['status' => 'success', 'message' => 'Cập nhật đơn vị thành công'], 201);
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

    public function deleteUnit($id)
    {
        // Lấy tất cả các đơn vị con của đơn vị cha
        $childUnits = DB::table('don_vi')->where('DONVICHA', $id)->where('IS_DELETED', 0)->get();

        // Nếu có đơn vị con
        if ($childUnits->isNotEmpty()) {
            return response()->json(['status' => 'failed', 'message' => 'Xóa đơn vị thất bại, hãy xóa dần các đơn vị con trước.'], 201);
            // // Xóa tất cả các đơn vị con
            // DB::table('don_vi')->where('DONVICHA', $id)->delete();
        }

        // Sau khi xóa tất cả các đơn vị con, xóa đơn vị cha
        DB::table('don_vi')->where('DONVI_ID', $id)->update(['IS_DELETED' => 1]);


        return response()->json(['status' => 'success', 'message' => 'Xóa đơn vị thành công'], 201);
    }
    public function getUnitByID($id)
    {
        $result = DB::table('don_vi')
            ->where('DONVI_ID', $id)
            ->first();
        return response()->json($result, 200);
    }
    public function getAllUnit($count)
    {
        $query = DB::table('don_vi')
            ->leftJoin('dia_ban_quan_ly', 'don_vi.DONVI_ID', '=', 'dia_ban_quan_ly.DONVI_ID')
            ->select('don_vi.*', DB::raw('GROUP_CONCAT(dia_ban_quan_ly.TENDIABAN SEPARATOR \', \') AS dia_ban_quan_ly'))
            ->where('don_vi.IS_DELETED', 0)
            ->whereNull('DONVICHA')
            ->groupBy(
                'don_vi.DONVI_ID',
                'don_vi.TEN_DONVI',
                'don_vi.DONVICHA',
                'don_vi.QUANHUYEN',
                'don_vi.XAPHUONG',
                'don_vi.DIACHI',
                'don_vi.SDT_DONVI',
                'don_vi.AP_KV',
                'don_vi.IS_DELETED',
                'don_vi.CREATED_AT',
                'don_vi.UPDATED_AT'
            );

        $count = 10; // Số lượng phần tử trên mỗi trang
        $results = $query->paginate($count);

        return response()->json($results, 200);
    }
    public function getAllUnitNoPaginate()
    {
        $result = DB::table('don_vi')->where('IS_DELETED', 0)
            ->get();
        return response()->json($result, 200);
    }
    public function getAllChildUnit()
    {
        $result = DB::table('don_vi')
            ->leftJoin('dia_ban_quan_ly', 'don_vi.DONVI_ID', '=', 'dia_ban_quan_ly.DONVI_ID')
            ->select('don_vi.*', DB::raw('GROUP_CONCAT(dia_ban_quan_ly.TENDIABAN SEPARATOR \', \') AS dia_ban_quan_ly'))
            ->where('IS_DELETED', 0)
            ->where('DONVICHA', '!=', null)
            ->groupBy(
                'don_vi.DONVI_ID',
                'don_vi.TEN_DONVI',
                'don_vi.DONVICHA',
                'don_vi.QUANHUYEN',
                'don_vi.XAPHUONG',
                'don_vi.DIACHI',
                'don_vi.SDT_DONVI',
                'don_vi.AP_KV',
                'don_vi.IS_DELETED',
                'don_vi.CREATED_AT',
                'don_vi.UPDATED_AT'
            )
            ->get();
        return response()->json($result, 200);
    }
    public function addUnit(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_DONVI' => 'required',
                'QUANHUYEN' => 'required',
                'XAPHUONG' => 'required',
                'AP_KV' => 'required',
                'SDT_DONVI' => [
                    'numeric',
                    // 'digits:10',
                    Rule::unique('don_vi', 'SDT_DONVI')
                ],
            ],
            [
                'TEN_DONVI.required' => 'Vui lòng nhập tên đơn vị',
                'QUANHUYEN.required' => 'Vui lòng chọn quận/huyện của đơn vị',
                'XAPHUONG.required' => 'Vui lòng chọn xã/phường của đơn vị',
                'AP_KV.required' => 'Vui lòng chọn ấp/khu vực của đơn vị',
                'SDT_DONVI.numeric' => 'Vui lòng nhập SĐT đơn vị là số',
                'SDT_DONVI.unique' => 'Vui lòng nhập SĐT không trùng trong hệ thống',
            ]
        );
        if ($validatedData->passes()) {
            $result = DB::table('don_vi')->insert([
                'TEN_DONVI' => $request->TEN_DONVI,
                'DONVICHA' => $request->DONVICHA === 0 ? null : $request->DONVICHA,
                'QUANHUYEN' => $request->QUANHUYEN,
                'XAPHUONG' => $request->XAPHUONG,
                'AP_KV' => $request->AP_KV,
                'DIACHI' => $request->DIACHI,
                'SDT_DONVI' => $request->SDT_DONVI,
                'is_deleted' => 0
            ]);
            return response()->json(['status' => 'success', 'message' => 'Thêm đơn vị thành công'], 201);
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
}

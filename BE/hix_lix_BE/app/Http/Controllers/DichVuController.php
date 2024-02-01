<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class DichVuController extends Controller
{
    public function getTypeOfPay()
    {
        $hinhthucdong = DB::table('hinh_thuc_dong')->get();
        return response()->json($hinhthucdong);
    }
    public function dsnhacungcap()
    {
        $dsnhacungcap = DB::table('nha_cung_cap')->get();
        return response()->json($dsnhacungcap);
    }
    public function searchsp($count, Request $request)
    {
        if (!empty($request->keywords)) {

            $sp = DB::table('nha_cung_cap')
                ->where('TEN_NCC', 'like', '%' . $request->keywords . '%');

            $sp = $sp->paginate($count);
            return response()->json(['dsspl' => $sp], 200);
        } else {
            $sp = DB::table('nha_cung_cap');


            $sp = $sp->paginate($count);
            return response()->json(['dsspl' => $sp], 200);
        }
    }

    public function searchqlt($count, Request $request)
    {
        if (!empty($request->keywords)) {

            $qlt = DB::table('chat_luong_dich_vu')
                ->where('TEN_CHATLUONG', 'like', '%' . $request->keywords . '%')
                ->orWhere('DIEMTU', 'like', '%' . $request->keywords . '%')
                ->orWhere('DENDIEM', 'like', '%' . $request->keywords . '%');

            $qlt = $qlt->paginate($count);
            return response()->json(['dsqlt' => $qlt], 200);
        } else {
            $qlt = DB::table('chat_luong_dich_vu');


            $qlt = $qlt->paginate($count);
            return response()->json(['dsqlt' => $qlt], 200);
        }
    }

    public function searchbost($count, Request $request)
    {
        if (!empty($request->keywords)) {
            $bost = DB::table('cau_hinh_bo')
                ->where('TEN_BO', 'like', '%' . $request->keywords . '%')
                ->orWhere('DIEMTU', 'like', '%' . $request->keywords . '%')
                ->orWhere('DENDIEM', 'like', '%' . $request->keywords . '%');
            $bost = $bost->paginate($count);
            return response()->json(['dsbost' => $bost], 200);
        } else {
            $bost = DB::table('cau_hinh_bo');
            $bost = $bost->paginate($count);
            return response()->json(['dsbost' => $bost], 200);
        }
    }

    
    
    public function searchsvqlt($count, Request $request)
    {
        if (!empty($request->keywords)) {

            $svqlt = DB::table('chat_luong_phuc_vu')
                ->where('TEN_CHATLUONGPV', 'like', '%' . $request->keywords . '%')
                ->orWhere('DIEMTU', 'like', '%' . $request->keywords . '%')
                ->orWhere('DENDIEM', 'like', '%' . $request->keywords . '%');

            $svqlt = $svqlt->paginate($count);
            return response()->json(['dssvqlt' => $svqlt], 200);
        } else {
            $svqlt = DB::table('chat_luong_phuc_vu');
            $svqlt = $svqlt->paginate($count);
            return response()->json(['dssvqlt' => $svqlt], 200);
        }
    }

    public function search($count, Request $request)
    {
        if (!empty($request->keywords)) {

            $dv = DB::table('dich_vu')
                ->join('loai_dich_vu', 'loai_dich_vu.ID_LDV', '=', 'dich_vu.ID_LDV')
                ->where('TEN_DV', 'like', '%' . $request->keywords . '%');

            if ($request->LOAI_DV !== 0) {
                $dv->where('dich_vu.ID_LDV', $request->LOAI_DV);
            }

            $dv = $dv->paginate($count);
            return response()->json(['dsdv' => $dv], 200);
        } else {
            $dv = DB::table('dich_vu')->join('loai_dich_vu', 'loai_dich_vu.ID_LDV', '=', 'dich_vu.ID_LDV');

            if ($request->LOAI_DV !== 0) {
                $dv->where('dich_vu.ID_LDV', $request->LOAI_DV);
            }

            $dv = $dv->paginate($count);
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

    public function addQuality(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_CHATLUONG' => ['required', Rule::unique('chat_luong_dich_vu', 'TEN_CHATLUONG')],
            ],
            [
                'TEN_CHATLUONG.required' => 'Vui lòng nhập tên chất lượng dịch vụ',
                'TEN_CHATLUONG.unique' => 'Tên chất lượng dịch vụ vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('chat_luong_dich_vu')->insert([
                    'TEN_CHATLUONG' => $request->TEN_CHATLUONG,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Thêm chất lượng dịch vụ thành công'], 201);
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

    
    public function addBOSetting(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_BO' => ['required', Rule::unique('cau_hinh_bo', 'TEN_BO')],
            ],
            [
                'TEN_BO.required' => 'Vui lòng nhập tên',
                'TEN_BO.unique' => 'Tên vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('cau_hinh_bo')->insert([
                    'TEN_BO' => $request->TEN_BO,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Thêm khả năng chuyển BO thành công'], 201);
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

    public function addServiceQuality(Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_CHATLUONGPV' => ['required', Rule::unique('chat_luong_phuc_vu', 'TEN_CHATLUONGPV')],
            ],
            [
                'TEN_CHATLUONGPV.required' => 'Vui lòng nhập tên chất lượng phục vụ',
                'TEN_CHATLUONGPV.unique' => 'Tên chất lượng phục vụ vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('chat_luong_phuc_vu')->insert([
                    'TEN_CHATLUONGPV' => $request->TEN_CHATLUONGPV,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Thêm chất lượng phục vụ thành công'], 201);
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

    public function updateQuality($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_CHATLUONG' => ['required', Rule::unique('chat_luong_dich_vu', 'TEN_CHATLUONG')->ignore($id, 'ID_CHATLUONG')],
            ],
            [
                'TEN_CHATLUONG.required' => 'Vui lòng nhập tên chất lượng dịch vụ',
                'TEN_CHATLUONG.unique' => 'Tên chất lượng dịch vụ vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('chat_luong_dich_vu')->where('ID_CHATLUONG', $id)->update([
                    'TEN_CHATLUONG' => $request->TEN_CHATLUONG,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Cập nhật chất lượng dịch vụ thành công'], 201);
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

    
    public function updateBOSetting($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_BO' => ['required', Rule::unique('cau_hinh_bo', 'TEN_BO')->ignore($id, 'ID_BO')],
            ],
            [
                'TEN_BO.required' => 'Vui lòng nhập tên',
                'TEN_BO.unique' => 'Tên vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('cau_hinh_bo')->where('ID_BO', $id)->update([
                    'TEN_BO' => $request->TEN_BO,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Cập nhật khả năng chuyển BO thành công'], 201);
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
    

    public function updateServiceQuality($id, Request $request)
    {
        $validatedData = Validator::make(
            $request->all(),
            [
                'TEN_CHATLUONGPV' => ['required', Rule::unique('chat_luong_phuc_vu', 'TEN_CHATLUONGPV')->ignore($id, 'ID_CHATLUONGPV')],
            ],
            [
                'TEN_CHATLUONGPV.required' => 'Vui lòng nhập tên chất lượng phục vụ',
                'TEN_CHATLUONGPV.unique' => 'Tên chất lượng phục vụ vui lòng không đặt trùng'
            ]
        );
        if ($validatedData->passes()) {
            if (intval($request->DENDIEM) < intval($request->DIEMTU)) {
                return response()->json(['status' => 'failed', 'message' => 'Số điểm của khoảng điểm cuối không được nhỏ hơn khoảng điểm bắt đầu'], 500);
            } else {
                $result = DB::table('chat_luong_phuc_vu')->where('ID_CHATLUONGPV', $id)->update([
                    'TEN_CHATLUONGPV' => $request->TEN_CHATLUONGPV,
                    'DIEMTU' => $request->DIEMTU,
                    'DENDIEM' => $request->DENDIEM
                ]);
                return response()->json(['status' => 'success', 'message' => 'Cập nhật chất lượng phục vụ thành công'], 201);
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

    public function deletequality($id)
    {
        $result = DB::table('chat_luong_dich_vu')
            ->where('ID_CHATLUONG', $id)
            ->update([
                'IS_DELETED' => 1,
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa chất lượng dịch vụ thành công'], 201);
    }
    public function deletebosetting($id)
    {
        $result = DB::table('cau_hinh_bo')
            ->where('ID_BO', $id)
            ->update([
                'IS_DELETED' => 1,
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa khả năng chuyển BO thành công'], 201);
    }

    

    
    public function deleteservicequality($id)
    {
        $result = DB::table('chat_luong_phuc_vu')
            ->where('ID_CHATLUONGPV', $id)
            ->update([
                'IS_DELETED' => 1,
            ]);
        return response()->json(['status' => 'success', 'message' => 'Xóa chất lượng phục vụ thành công'], 201);
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
    public function get_danhsachchatluong($count)
    {
        $result = DB::table('chat_luong_dich_vu')
            ->where(
                'IS_DELETED',
                0
            )
            ->paginate($count);
        return response()->json($result, 200);
    }
    public function get_danhsachcauhinhBO($count)
    {
        $result = DB::table('cau_hinh_bo')
            ->where(
                'IS_DELETED',
                0
            )
            ->paginate($count);
        return response()->json($result, 200);
    }
    
    public function get_danhsachchatluongpv($count)
    {
        $result = DB::table('chat_luong_phuc_vu')
            ->where(
                'IS_DELETED',
                0
            )
            ->paginate($count);
        return response()->json($result, 200);
    }
    public function get_alldanhsachchatluong()
    {
        $result = DB::table('chat_luong_dich_vu')
            ->where(
                'IS_DELETED',
                0
            )
            ->get();
        return response()->json($result, 200);
    }
    public function get_alldanhsachchatluongpv()
    {
        $result = DB::table('chat_luong_phuc_vu')
            ->where(
                'IS_DELETED',
                0
            )
            ->get();
        return response()->json($result, 200);
    }
    public function get_alldanhsachcauhinhBO()
    {
        $result = DB::table('cau_hinh_bo')
            ->where(
                'IS_DELETED',
                0
            )
            ->get();
        return response()->json($result, 200);
    }
    
    public function get_danhsachnhacungcapapi()
    {
        $result = DB::table('nha_cung_cap')
            ->where(
                'is_deleted',
                0
            )->get();
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

    public function getAllServiceById($id)
    {
        $result = DB::table('dich_vu')
            ->join('loai_dich_vu', 'dich_vu.ID_LDV', '=', 'loai_dich_vu.ID_LDV')
            ->where('dich_vu.ID_LDV', $id)
            ->get();
        return response()->json($result, 200);
    }
    public function getSpByID($id)
    {
        $result = DB::table('nha_cung_cap')
            ->where('ID_NCC', $id)
            ->first();
        return response()->json($result, 200);
    }
    public function getQualityByID($id)
    {
        $result = DB::table('chat_luong_dich_vu')
            ->where('ID_CHATLUONG', $id)
            ->first();
        return response()->json($result, 200);
    }
    public function getBOByID($id)
    {
        $result = DB::table('cau_hinh_bo')
            ->where('ID_BO', $id)
            ->first();
        return response()->json($result, 200);
    }
    
    public function getServiceQualityByID($id)
    {
        $result = DB::table('chat_luong_phuc_vu')
            ->where('ID_CHATLUONGPV', $id)
            ->first();
        return response()->json($result, 200);
    }
    
}

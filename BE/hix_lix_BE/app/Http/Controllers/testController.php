<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NhanVien;
use App\Models\KeHoach;
use App\Http\Controllers\Controller;
use App\Models\khachhang;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class testController extends Controller
{
    public function test(){

        return response()->json('test', 200);
    }

    public function checkToken(){
        return response()->json('Success', 200);
    }

    public function SignIn(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $token = null;

        try {
            $user = NhanVien::whereRaw("LOWER(TAIKHOAN_NV) = LOWER(?)",strtolower($credentials['username']))
                ->first();



            if (!$user) {
                return response()->json(['status' => 'failed', 'message' => 'Sai tên đăng nhập, vui lòng kiểm tra lại.'], 422);
            }


            if (!password_verify($credentials['password'], $user->MATKHAU_NV)) {
                return response()->json(['status' => 'failed', 'message' => 'Sai mật khẩu, vui lòng kiểm tra lại.'], 422);
            }

            $usercheckactive = NhanVien::where('TRANGTHAI_NV', 0)->where('ID_NV', $user->ID_NV)
                ->first();

            $usercheckExist = NhanVien::where('IS_DELETED', 1)->where('ID_NV', $user->ID_NV)
                ->first();

            if($usercheckactive)
            {
                return response()->json(['status' => 'failed', 'message' => 'Tài khoản của bạn đã bị khóa, hãy liên hệ Admin để được mở khóa!'], 400);
            }

            if($usercheckExist)
            {
                return response()->json(['status' => 'failed', 'message' => 'Tài khoản của bạn đã bị xóa!'], 400);
            }

            $customClaims = [
                'id_nv' => $user->ID_NV,
                'ten_nv' => $user->TEN_NV,
                'email_nv' => $user->EMAIL_NV,
                'chucvu_nv' => $user->CHUCVU_NV,
                'donvi_id' => $user->DONVI_ID
                // Các thông tin khác nếu cần
            ];

            $token = JWTAuth::fromUser($user, $customClaims);
            return response()->json(['status' => 'success','message' => 'Đăng nhập thành công', 'access_token' => $token]);
        } catch (JWTException $e) {
            return response()->json(['status' => 'failed','message' => 'failed_to_create_token'], 500);
        }

        return response()->json(['status' => 'success','message' => 'Đăng nhập thành công', 'access_token' => $token]);
    }

}

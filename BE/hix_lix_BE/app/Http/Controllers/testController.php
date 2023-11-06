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

    public function SignIn(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $token = null;

        try {
            $user = NhanVien::whereRaw("LOWER(TAIKHOAN_NV) = LOWER(?)",strtolower($credentials['username']))
                ->first();

            if (!$user) {
                return response()->json(['invalid_email_or_password'], 422);
            }
            

            if (!password_verify($credentials['password'], $user->MATKHAU_NV)) {
                return response()->json(['invalid_email_or_password'], 422);
            }

            $customClaims = [
                'id_nv' => $user->ID_NV,
                'ten_nv' => $user->TEN_NV,
                'email_nv' => $user->EMAIL_NV,
                'chucvu_nv' => $user->CHUCVU_NV
                // Các thông tin khác nếu cần
            ];

            $token = JWTAuth::fromUser($user, $customClaims);
            return response()->json(['message' => 'Login successful', 'access_token' => $token]);
        } catch (JWTException $e) {
            return response()->json(['message' => 'failed_to_create_token'], 500);
        }

        return response()->json(['message' => 'Login successful', 'access_token' => $token]);
    }

}

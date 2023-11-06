<?php

use App\Http\Controllers\danhsachkhachhang;
use App\Http\Controllers\Lix;
use App\Http\Controllers\testController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\DichVuController;
use App\Http\Controllers\DonViHanhChinhController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/test', [testController::class, 'test']);
Route::post('/login', [testController::class, 'SignIn']);
//khach hang
Route::get('/get_danhsachkhachhang/{count}', [danhsachkhachhang::class, 'get_danhsachkhachhang']);
Route::get('/getKHByID/{id}', [danhsachkhachhang::class, 'getKHByID']);
Route::get('/getsurveybyKH/{id}', [danhsachkhachhang::class, 'getsurveybyKH']);
Route::post('/addcustomer', [danhsachkhachhang::class, 'addcustomer']);
Route::put('/updatecustomer', [danhsachkhachhang::class, 'updatecustomer']);
Route::delete('/deletecustomer/{id}', [danhsachkhachhang::class, 'deletecustomer']);
Route::post('/searchcustomer', [danhsachkhachhang::class, 'searchcustomer']);
//Khach hang Excel
Route::post('/export-excel', [danhsachkhachhang::class, 'exportExcel']);
// Route::post('/export-excel', 'App\Http\Controllers\danhsachkhachhang@exportExcel')->name('exportExcel');
//DVHC
Route::get('/getallquanhuyen', [danhsachkhachhang::class, 'getallquanhuyen']);
Route::get('/getAllXaPhuong/{id}', [danhsachkhachhang::class, 'getAllXaPhuong']);
Route::post('/AddEditLix', [Lix::class, 'AddEditLix']);
Route::get('/getLix_By_IdCustomer_and_IdService/{khachhang}/{Service}/{idnhanvien}', [Lix::class, 'getLix_By_IdCustomer_and_IdService']);
Route::post('/EditLix', [Lix::class, 'EditLix']);
Route::get('livesearch_lix', [Lix::class, 'livesearch_lix']);
//Lix
Route::get('/get_lix', [Lix::class, 'get_lix']);


//dichvu
Route::get('/dichvu', [Lix::class, 'getServiceList']);


Route::get('/getKH_ByID_LIX/{id}', [danhsachkhachhang::class, 'getKH_ByID_LIX']);

//nhan vien
Route::post('/addStaff', [NhanVienController::class, 'addStaff']);
Route::put('/updateStaff', [NhanVienController::class, 'updateStaff']);
Route::put('/deleteStaff', [NhanVienController::class, 'deleteStaff']);
Route::get('/getStaffById', [NhanVienController::class, 'getStaffById']);
Route::get('/getAllStaff', [NhanVienController::class, 'getAllStaff']);

// Dịch vụ
Route::post('/themDichVu', [DichVuController::class, 'themDichVu']);
Route::put('/capNhatDichVu', [DichVuController::class, 'capNhatDichVu']);
Route::put('/xoaDichVu', [DichVuController::class, 'xoaDichVu']);
Route::get('/getAllServices', [DichVuController::class, 'getAllServices']);
Route::get('/getServiceById', [DichVuController::class, 'getServiceById']);

// Đơn vị hành chính
Route::post('/themDonViHanhChinh', [DonViHanhChinhController::class, 'themDonViHanhChinh']);
Route::put('/capNhatDonViHanhChinh', [DonViHanhChinhController::class, 'capNhatDonViHanhChinh']);
Route::put('/xoaDonViHanhChinh', [DonViHanhChinhController::class, 'xoaDonViHanhChinh']);
Route::get('/getAllDonViHanhChinh', [DonViHanhChinhController::class, 'getAllDonViHanhChinh']);
Route::get('/getDonViHanhChinhById', [DonViHanhChinhController::class, 'getDonViHanhChinhById']);




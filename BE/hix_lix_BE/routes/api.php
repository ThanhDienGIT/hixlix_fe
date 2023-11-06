<?php

use App\Http\Controllers\danhsachkhachhang;
use App\Http\Controllers\Lix;
use App\Http\Controllers\testController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => ['api']], function () {
    Route::post('/login', [testController::class, 'SignIn']);


    Route::group(['middleware' => 'jwt.auth'], function () {
        // Các route yêu cầu xác thực
        Route::get('/test', [testController::class, 'test']);
        
        //khach hang
        Route::get('/get_danhsachkhachhang/{count}', [danhsachkhachhang::class, 'get_danhsachkhachhang']);
        Route::get('/get_danhsachbaocaophieu/{count}', [danhsachkhachhang::class, 'get_danhsachbaocaophieu']);
        Route::get('/getKHByID/{id}', [danhsachkhachhang::class, 'getKHByID']);
        Route::get('/getsurveybyKH/{id}', [danhsachkhachhang::class, 'getsurveybyKH']);
        Route::post('/addcustomer', [danhsachkhachhang::class, 'addcustomer']);
        Route::post('/asigncustomer', [danhsachkhachhang::class, 'asigncustomer']);
        Route::put('/updatecustomer', [danhsachkhachhang::class, 'updatecustomer']);
        Route::delete('/deletecustomer/{id}', [danhsachkhachhang::class, 'deletecustomer']);
        Route::post('/searchcustomer', [danhsachkhachhang::class, 'searchcustomer']);
        Route::post('/searchinasignment', [danhsachkhachhang::class, 'searchinasignment']);
        Route::post('/filter-report', [danhsachkhachhang::class, 'filterreport']);
        Route::get('/getNV', [danhsachkhachhang::class, 'getNV']);
        //Khach hang Excel
        Route::post('/export-excel', [danhsachkhachhang::class, 'exportExcel']);
        // Route::post('/export-excel', 'App\Http\Controllers\danhsachkhachhang@exportExcel')->name('exportExcel');
        //DVHC
        Route::get('/getallquanhuyen', [danhsachkhachhang::class, 'getallquanhuyen']);
        Route::get('/getAllXaPhuong/{id}', [danhsachkhachhang::class, 'getAllXaPhuong']);
        Route::get('/getAllApById/{id}', [danhsachkhachhang::class, 'getAllApById']);
        Route::get('/getAllAp/{id}', [danhsachkhachhang::class, 'getAllAp']);
        Route::post('/AddEditLix', [Lix::class, 'AddEditLix']);
        Route::get('/getLix_By_IdCustomer_and_IdService/{khachhang}/{Service}/{idnhanvien}', [Lix::class, 'getLix_By_IdCustomer_and_IdService']);
        Route::post('/EditLix', [Lix::class, 'EditLix']);
        Route::get('livesearch_lix', [Lix::class, 'livesearch_lix']);
        //Lix
        Route::get('/get_lix', [Lix::class, 'get_lix']);
    
    
        //dichvu
        Route::get('/dichvu', [Lix::class, 'getServiceList']);
    
    
        Route::get('/getKH_ByID_LIX/{id}', [danhsachkhachhang::class, 'getKH_ByID_LIX']);
    });
    
});

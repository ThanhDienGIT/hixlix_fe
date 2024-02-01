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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => ['api']], function () {
    Route::post('/login', [testController::class, 'SignIn']);


    Route::group(['middleware' => 'jwt.auth'], function () {
        // Các route yêu cầu xác thực
        Route::get('/test', [testController::class, 'test']);
        Route::get('/checktoken', [testController::class, 'checktoken']);
        //khach hang
        Route::get('/get_danhsachkhachhang/{count}', [danhsachkhachhang::class, 'get_danhsachkhachhang']);
        Route::get('/get_danhsachbaocaophieu/{count}', [danhsachkhachhang::class, 'get_danhsachbaocaophieu']);
        Route::get('/get_danhsachbaocaophieuBO/{count}', [danhsachkhachhang::class, 'get_danhsachbaocaophieuBO']);
        Route::get('/get_danhsachdichvu/{count}', [DichVuController::class, 'getAllServices']);
        Route::get('/get_danhsachnhacungcap/{count}', [DichVuController::class, 'get_danhsachnhacungcap']);
        Route::get('/get_danhsachchatluong/{count}', [DichVuController::class, 'get_danhsachchatluong']);
        Route::get('/get_danhsachcauhinhBO/{count}', [DichVuController::class, 'get_danhsachcauhinhBO']);
        Route::get('/get_danhsachchatluongpv/{count}', [DichVuController::class, 'get_danhsachchatluongpv']);
        Route::get('/get_alldanhsachchatluong', [DichVuController::class, 'get_alldanhsachchatluong']);
        Route::get('/get_alldanhsachchatluongpv', [DichVuController::class, 'get_alldanhsachchatluongpv']);
        Route::get('/get_alldanhsachcauhinhBO', [DichVuController::class, 'get_alldanhsachcauhinhBO']);
        Route::get('/get_danhsachnhacungcapapi', [DichVuController::class, 'get_danhsachnhacungcapapi']);

        Route::get('/getServiceType', [DichVuController::class, 'getServiceType']);
        Route::get('/getTypeOfPay', [DichVuController::class, 'getTypeOfPay']);
        
        Route::post('/search-dv/{count}', [DichVuController::class, 'search']);


        Route::post('/addUser', [NhanVienController::class, 'addStaff']);
        Route::get('/get_danhsachnguoidung/{count}', [NhanVienController::class, 'getAllStaff']);
        Route::get('/getStaffByID/{id}', [NhanVienController::class, 'getStaffById']);
        Route::delete('/deletestaff/{id}', [NhanVienController::class, 'deleteStaff']);
        Route::post('/updateUser/{id}', [NhanVienController::class, 'updateStaff']);
        Route::post('/search-user/{count}', [NhanVienController::class, 'search']);
        Route::get('/dsnhacungcap', [DichVuController::class, 'dsnhacungcap']);

        Route::post('/getDetailLix',[Lix::class, 'getDetailLix']);





        Route::post('/addService', [DichVuController::class, 'themDichVu']);
        Route::post('/addSupplier', [DichVuController::class, 'addSupplier']);
        Route::post('/addQuality', [DichVuController::class, 'addQuality']);
        Route::post('/addBOSetting', [DichVuController::class, 'addBOSetting']);
        Route::post('/addServiceQuality', [DichVuController::class, 'addServiceQuality']);
        Route::delete('/deletesupplier/{id}', [DichVuController::class, 'deletesupplier']);
        Route::delete('/deletequality/{id}', [DichVuController::class, 'deletequality']);
        Route::delete('/deletebosetting/{id}', [DichVuController::class, 'deletebosetting']);
        
        Route::delete('/deleteservicequality/{id}', [DichVuController::class, 'deleteservicequality']);
        Route::post('/search-suppliler/{count}', [DichVuController::class, 'searchsp']);
        Route::post('/search-quality/{count}', [DichVuController::class, 'searchqlt']);
        Route::post('/search-BO-setting/{count}', [DichVuController::class, 'searchbost']);
        Route::post('/search-service-quality/{count}', [DichVuController::class, 'searchsvqlt']);
        Route::post('/updateSupplier/{id}', [DichVuController::class, 'updateSupplier']);
        Route::post('/updateQuality/{id}', [DichVuController::class, 'updateQuality']);
        Route::post('/updateBOSetting/{id}', [DichVuController::class, 'updateBOSetting']);
        Route::post('/updateServiceQuality/{id}', [DichVuController::class, 'updateServiceQuality']);
        Route::get('/getSpByID/{id}', [DichVuController::class, 'getSpByID']);
        Route::get('/getQualityByID/{id}', [DichVuController::class, 'getQualityByID']);
        Route::get('/getBOByID/{id}', [DichVuController::class, 'getBOByID']);
        Route::get('/getServiceQualityByID/{id}', [DichVuController::class, 'getServiceQualityByID']);
        




        Route::delete('/deleteservice/{id}', [DichVuController::class, 'xoaDichVu']);
        Route::get('/getSVByID/{id}', [DichVuController::class, 'getServiceById']);
        Route::get('/getAllSVById/{id}', [DichVuController::class, 'getAllServiceById']);
        Route::post('/updateService/{id}', [DichVuController::class, 'capNhatDichVu']);



        Route::get('/getKHByID/{id}', [danhsachkhachhang::class, 'getKHByID']);
        Route::get('/getsurveybyKH/{id}', [danhsachkhachhang::class, 'getsurveybyKH']);
        Route::post('/addcustomer', [danhsachkhachhang::class, 'addcustomer']);
        Route::post('/asigncustomer', [danhsachkhachhang::class, 'asigncustomer']);
        Route::put('/updatecustomer', [danhsachkhachhang::class, 'updatecustomer']);
        Route::delete('/deletecustomer/{id}', [danhsachkhachhang::class, 'deletecustomer']);
        Route::post('/searchcustomer/{count}', [danhsachkhachhang::class, 'searchcustomer']);
        Route::post('/searchinasignment/{count}', [danhsachkhachhang::class, 'searchinasignment']);
        Route::post('/filter-report/{count}', [danhsachkhachhang::class, 'filterreport']);
        Route::post('/filter-report-BO/{count}', [danhsachkhachhang::class, 'filterreportBO']);
        Route::get('/getNV', [danhsachkhachhang::class, 'getNV']);
        //Khach hang Excel
        Route::post('/export-excel', [danhsachkhachhang::class, 'exportExcel']);
        Route::post('/export-excel-bo', [danhsachkhachhang::class, 'exportExcelBO']);
        
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

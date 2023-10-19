<?php

use App\Http\Controllers\API\AuthController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/test', [testController::class, 'test']);
Route::post('/login', [testController::class, 'SignIn']);
//khach hang
Route::get('/get_danhsachkhachhang/{count}', [danhsachkhachhang::class, 'get_danhsachkhachhang']);
Route::get('/getKHByID/{id}', [danhsachkhachhang::class, 'getKHByID']);
Route::get('/dichvu', [danhsachkhachhang::class, 'getServiceList']);
Route::put('/update_khachhang', [danhsachkhachhang::class, 'update_khachhang']);
Route::put('/delete_khachhang', [danhsachkhachhang::class, 'delete_khachhang']);

//Lix
Route::get('/get_lix/{count}', [Lix::class, 'get_lix']);

Route::post('/add_lix', [Lix::class, 'add_lix']);
Route::put('/update_lix', [Lix::class, 'update_lix']);
Route::post('/delete_lix', [Lix::class, 'delete_lix']);

Route::get('livesearch_lix', [Lix::class, 'livesearch_lix']);

//dichvu




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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/test', [testController::class, 'test']);
//khach hang
Route::get('/get_danhsachkhachhang', [danhsachkhachhang::class, 'get_danhsachkhachhang']);
//Lix
Route::get('/get_lix', [Lix::class, 'get_lix']);



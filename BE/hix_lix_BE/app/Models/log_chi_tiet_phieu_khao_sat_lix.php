<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class log_chi_tiet_phieu_khao_sat_lix extends Model
{
    use HasFactory;
    protected $table = 'log_chi_tiet_phieu_khao_sat_lix';
    protected $primaryKey = 'id_ctpks';
    public $timestamps = false;
   

    protected $fillable = [
        'id_pks',
        'id_dv',
        'diachi_kh',
        'tenkhachhangdaidien_ctpks',
        'sodienthoaikhachhangdaidien_ctpks',
        'accountkhachhang_ctpks',
        'muccuoc_ctpks',
        'hinhthucdong_ctpks',
        'ngaybatdaudongcoc_ctpks',
        'ngayketthucdongcoc_ctpks',
        'nhacungcap_ctpks',
        'diemhailong_ctpks',
        'camnhandichvu_ctpks',
        'camnhanphucvu_ctpks',
        'ykienkhac',
        'nguoitao_ctpks',
        'ngaytao_ctpks',
        'nguoiupdate_ctpks',
        'ngayupdate_ctpks',
        'is_deleted',
    ];

   
}

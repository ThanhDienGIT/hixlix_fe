<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class chi_tiet_phieu_khao_sat_lix extends Model
{
    use HasFactory;
    protected $table = 'chi_tiet_phieu_khao_sat_lix';
    protected $primaryKey = 'ID_CTPKS';
    public $timestamps = false;


    protected $fillable = [
        'ID_PKS',
        'ID_DV',
        'DIACHI_KH',
        'TENKHACHHANGDAIDIEN_CTPKS',
        'SODIENTHOAIKHACHHANGDAIDIEN_CTPKS',
        'ACCOUNTKHACHHANG_CTPKS',
        'MUCCUOC_CTPKS',
        'HINHTHUCDONG_CTPKS',
        'NGAYBATDAUDONGCOC_CTPKS',
        'NGAYKETTHUCDONGCOC_CTPKS',
        'NHACUNGCAP_CTPKS',
        'DIEMHAILONG_CTPKS',
        'CAMNHANDICHVU_CTPKS',
        'CANNHANPHUCVU_CTPKS',
        'YKIENKHAC',
        'NGUOITAO_CTPKS',
        'NGAYTAO_CTPKS',
        'NGUOIUPDATE_CTPKS',
        'NGAYUPDATE_CTPKS',
        'IS_DELETED',
    ];

    public function phieukhaosat()
    {
        return $this->belongsTo(phieukhaosat::class, 'ID_PKS', 'ID_PKS');
    }

    // public function khachhang()
    // {
    //     return $this->belongsTo(phieukhaosat::class, 'id_pks', 'id_pks');
    // }
}

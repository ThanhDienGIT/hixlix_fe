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
        'THOIGIANLAPDAT_CTPKS',
        'THOIGIANNGUNG_CTPKS',
        'NHACUNGCAP_CTPKS',
        'BO',
        'DIEM_BO',
        'DIEMHAILONG_CTPKS',
        'CAMNHANDICHVU_CTPKS',
        'CANNHANPHUCVU_CTPKS',
        'YKIENKHAC',
        'KHONG_SD',
        'NGUOITAO_CTPKS',
        'NGAYTAO_CTPKS',
        'NGUOIUPDATE_CTPKS',
        'NGAYUPDATE_CTPKS',
        'IS_DELETED',
        'GIA_TIEN',
        'ID_NV'
    ];

}

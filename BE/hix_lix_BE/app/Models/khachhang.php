<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class khachhang extends Model
{
    use HasFactory;
    protected $table = 'khach_hang';
    protected $primaryKey = 'id_kh';
    public $timestamps = false;
   

    protected $fillable = [
        'id_nv',
        'id_dvhc',
        'ten_kh',
        'diachi_kh',
        'sodienthoai_kh',
        'cccd_kh',
        'sonhankhau_kh',
        'ngaysinh_kh',
        'nghenghiep_kh',
        'mahuyen_kh',
        'maxa_kh',
        'baohong_kh',
        'thoigianlapdat_kh',
        'thoigianngung_kh',
        'filename_kh',
        'ngaytao_kh',
        'nguoitao_kh',
        'ghichu_kh',
        'trangthai_kh'
    ];

    public function donvihanhchinh()
    {
        return $this->belongsTo(NhanVien::class, 'NV_ID', 'NV_ID');
    }

    public function phieukhaosat()
    {
        return $this->hasOne(phieukhaosat::class, 'ID_KH', 'ID_KH');
    }

 
}

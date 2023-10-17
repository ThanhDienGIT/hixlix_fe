<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phieukhaosat extends Model
{
    use HasFactory;
    protected $table = 'phieu_khao_sat';
    protected $primaryKey = 'id_pks';
    public $timestamps = false;
   

    protected $fillable = [
        'id_kh',
        'id_nv',
        'trangthai_pks',
    ];

    public function chitietpks()
    {
        return $this->hasMany(chi_tiet_phieu_khao_sat_lix::class, 'ID_PKS', 'ID_PKS');
    }
    public function nhanviens()
    {
        return $this->belongsTo(nhanvien::class, 'ID_NV', 'ID_NV');
    }
    public function khachhangs()
    {
        return $this->hasOne(khachhang::class, 'ID_KH', 'ID_KH');
    }
}

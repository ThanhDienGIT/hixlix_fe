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
        return $this->hasMany(chi_tiet_phieu_khao_sat_lix::class, 'id_ctpks', 'id_ctpks');
    }
    public function nhanviens()
    {
        return $this->hasMany(nhanvien::class, 'id_nv', 'id_nv');
    }
    public function khachhangs()
    {
        return $this->belongsTo(nhanvien::class, 'id_kh', 'id_kh');
    }
}

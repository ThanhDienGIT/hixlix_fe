<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dichvu extends Model
{
    use HasFactory;
    protected $table = 'dich_vu';
    protected $primaryKey = 'id_dv';
    public $timestamps = false;
   

    protected $fillable = [
        'ten_dv',
        'trangthai_dv',
        'id_ldv',
        'is_deleted'
    ];

    public function chitietkhaosats()
    {
        return $this->hasMany(chi_tiet_phieu_khao_sat_lix::class, 'id_dv', 'id_dv');
    }

    public function loaidichvu()
    {
        return $this->belongsTo(loaidichvu::class, 'id_ldv', 'id_ldv');
    }
}

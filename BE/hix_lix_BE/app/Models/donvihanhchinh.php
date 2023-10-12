<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class donvihanhchinh extends Model
{
    use HasFactory;
    protected $table = 'don_vi_hanh_chinh';
    protected $primaryKey = 'id_dvhc';
    public $timestamps = false;
   

    protected $fillable = [
        'ten_dvhc',
        'cap_dvhc',
        'id_cha_dvhc',
        'is_deleted',
    ];

    public function khachhangs()
    {
        return $this->hasMany(khachhang::class, 'id_dvhc', 'id_dvhc');
    }

    public function nhanviens()
    {
        return $this->hasMany(nhanvien::class, 'id_dvhc', 'id_dvhc');
    }

}

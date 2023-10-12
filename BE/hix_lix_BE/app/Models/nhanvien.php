<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class nhanvien extends Model
{
    use HasFactory;
    protected $table = 'nhan_vien';
    protected $primaryKey = 'id_nv';
    public $timestamps = false;
   

    protected $fillable = [
        'ten_nv',
        'sdt_nv',
        'diachi_nv',
        'email_nv',
        'chucvu_nv',
        'taikhoan_nv',
        'matkhau_nv',
        'trangthai_nv',
        'is_deleted',
    ];

    public function donvihanhchinh()
    {
        return $this->belongsTo(donvihanhchinh::class, 'id_dvhc', 'id_dvhc');
    }

    public function phieukhaosats()
    {
        return $this->hasMany(donvihanhchinh::class, 'id_nv', 'id_nv');
    }
}
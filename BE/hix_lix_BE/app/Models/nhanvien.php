<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class nhanvien extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $table = 'nhan_vien';
    protected $primaryKey = 'ID_NV';
    public $timestamps = false;
   

    protected $fillable = [
        'ten_nv',
        'sdt_nv',
        'diachi_nv',
        'email_nv',
        'chucvu_nv',
        'donvi_id',
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

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

   
    public function getJWTCustomClaims()
    {
        return [
            'id_nv' => $this->ID_NV,
            'ten_nv' => $this->TEN_NV,
            'email_nv' => $this->EMAIL_NV,
            'chucvu_nv' => $this->CHUCVU_NV,
            'donvi_id' => $this->DONVI_ID
            // Các thông tin khác nếu cần
        ];
    }
}

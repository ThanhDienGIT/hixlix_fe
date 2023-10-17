<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

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
        'taikhoan_nv',
        'matkhau_nv',
        'trangthai_nv',
        'is_deleted',
    ];
    protected $hidden = ['MATKHAU_NV'];

    public function donvihanhchinh()
    {
        return $this->belongsTo(donvihanhchinh::class, 'ID_DVHC', 'ID_DVHC');
    }

    public function phieukhaosats()
    {
        return $this->hasMany(donvihanhchinh::class, 'ID_NV', 'ID_NV');
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
            'chucvu_nv' => $this->CHUCVU_NV
            // Các thông tin khác nếu cần
        ];
    }
}

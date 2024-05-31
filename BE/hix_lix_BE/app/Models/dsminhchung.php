<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class dsminhchung extends Model
{
    use HasFactory;
    protected $table = 'file_minh_chung';
    protected $primaryKey = 'idfileminhchung';
    public $timestamps = false;
   

    protected $fillable = [
        'tenfile',
        'url',
        'dateCreated',
        'userCreated',
        'IDKhachHang',
        'IdPhieuKhaoSat',
        'Mota'
    ];
}

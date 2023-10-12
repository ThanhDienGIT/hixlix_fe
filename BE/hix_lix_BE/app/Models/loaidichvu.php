<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class loaidichvu extends Model
{
    use HasFactory;
    protected $table = 'loai_dich_vu';
    protected $primaryKey = 'id_ldv';
    public $timestamps = false;
   

    protected $fillable = [
        'ten_ldv'
    ];

    public function dichvus()
    {
        return $this->hasMany(dichvu::class, 'id_ldv', 'id_ldv');
    }
}

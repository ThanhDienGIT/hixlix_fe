<?php

namespace App\Http\Controllers;

use App\Models\dichvu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Lix extends Controller
{
    public function get_lix()
    {

    }

    public function dichvu(){
        $result = dichvu::get();
        return response()->json($result, 200);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class testController extends Controller
{
    //
    public function test(){
        $request = DB::table('testtable')->get();
        return response()->json($request, 200);
    }
}

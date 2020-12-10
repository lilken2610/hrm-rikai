<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class ImportExcelController extends Controller
{
	function index(){
		return view('holidays.import');
	}
}

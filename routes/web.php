<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{HolidayController, MailController, CompanyController};
use App\Models\Holiday;
use App\Http\Controllers\{LoginController, ResetPassWordController, UserController};
use Illuminate\Support\Facades\Session;
use App\Http\Middleware\Login;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', [LoginController::class, 'getLogin']);
Route::post('/send_login', [LoginController::class, 'postLogin']);
Route::get('/logout', [LoginController::class, 'logout']);

Route::get('/reset_password', [MailController::class, 'getResetPass']);
Route::post('/send_resetpassword', [MailController::class, 'postResetPass']);

Route::get('/reset_password_with_token/token={token}', [ResetPassWordController::class, 'getReset']);
Route::post('/send_password_with_token', [ResetPassWordController::class, 'postReset']);

Route::get('/company', [CompanyController::class, 'index']);
Route::get('/company/search', [CompanyController::class, 'search']);
Route::get('/company/list', [CompanyController::class, 'list']);

Route::get('/company/create', [CompanyController::class, 'getCreate']);
Route::post('/company/create', [CompanyController::class, 'postCreate']);

Route::get('/company/update/id={id}', [CompanyController::class, 'getUpdate']);
Route::post('/company/update', [CompanyController::class, 'postUpdate']);

Route::get('/', function () {
    return view('welcome');
});
Route::resource('holidays', HolidayController::class);
Route::resource('employee_holidays', EmployeeHolidayController::class);
Route::get('/search', [HolidayController::class,'search'])->name('search'); 
Route::get('locale/{locale}', function ($locale){
    Session::put('locale', $locale);
    return redirect()->back();
});
Route::get('/gets',function(){
	Holiday::withTrashed()->restore();
});
use App\Http\Controllers\WorkingtimesController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CreateController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Request;
use App\Models\Employee;
use App\Models\Position;
Route::get('/', function () {
    return view('welcome');
});
Route::resource('employees', EmployeeController::class);
Route::get('/search', [EmployeeController::class,'searchEmployee'])->name('search'); 
Route::get('locale/{locale}', function ($locale){
    Session::put('locale', $locale);
    return redirect()->back();
});



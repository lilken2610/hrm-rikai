<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HolidayAPIController;
use App\Http\Controllers\EmployeeHolidayAPIController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\WorkingtimesController;
use App\Http\Services\WorkingtimeService;
use App\Http\Controllers\EmployeeAPIController;
use App\Models\{Employee,DepartmentEmployee};
use Illuminate\Support\Facades\Storage;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('send-reset-password', [AuthController::class, 'doSendResetPassword']);
    Route::get('get-reset-password/{token}', [AuthController::class, 'getChangePass']);
    Route::post('do-reset-password', [AuthController::class, 'postChangePass']);
    
    Route::get('list-companies', [CompanyController::class, 'listCompanies']);
    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::delete('logout', [AuthController::class, 'logout']);
        Route::get('user', [AuthController::class, 'user']);
        Route::get('search-companies', [CompanyController::class, 'searchCompanies']);
        Route::post('create-company', [CompanyController::class, 'store']);
        Route::delete('delete-company/{id}', [CompanyController::class, 'destroy']);
        Route::put('detail-company/{id}/edit', [CompanyController::class, 'update']);
        Route::get('detail-company/{id}', [CompanyController::class, 'show']);
 
        Route::put('update-avatar', [UserController::class, 'updateAvatar']);
        Route::put('update-info', [UserController::class, 'updateInfo']);
        Route::put('update-password', [UserController::class, 'updatePasswordAccount']);
           
        Route::post('create-user', [UserController::class, 'store']);
        Route::get('search-users', [UserController::class, 'search']);
        Route::get('list-users', [UserController::class, 'index']);
        Route::get('check-email', [UserController::class, 'checkEmail']);
        Route::get('detail-user/{id}', [UserController::class, 'show']);
        Route::put('update-info-user/{id}', [UserController::class, 'updateInfoById']);
        Route::put('update-password-user/{id}', [UserController::class, 'updatePasswordById']);
    });
});
Route::get('/list-holiday',[HolidayAPIController::class,'getListHoliday']);
Route::get('/search-list-holiday',[HolidayAPIController::class,'searchListHoliday']);
Route::get('/add-holiday',[HolidayAPIController::class,'createHoliday']);
Route::post('/store-holiday',[HolidayAPIController::class,'storeHoliday']);
Route::get('/show-holiday/{id}',[HolidayAPIController::class,'showHoliday']);
Route::get('/edit-holiday/{id}',[HolidayAPIController::class,'editHoliday']);
Route::put('/update-holiday/{id}',[HolidayAPIController::class,'updateHoliday']);
Route::delete('/delete-holiday/{id}',[HolidayAPIController::class,'deleteHoliday']);
//  Route::resource('holidays', 'HolidayAPIController');

Route::get('/list-employee-holiday',[EmployeeHolidayAPIController::class,'getListEmployeeHoliday']);
// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('/workingtimes',[WorkingtimesController::class,'getListWorkingTime']);

Route::get('/search-list-workingtime',[WorkingtimesController::class,'searchListWorkingtime']);
Route::get('/add-time',[WorkingtimesController::class,'createTime']);
Route::post('/store-time',[WorkingtimesController::class,'store']);
Route::get('/edit-time/{id}',[WorkingtimesController::class,'edit']);
Route::put('/update-time/{id}',[WorkingtimesController::class,'update']);
Route::delete('/delete-time/{id}',[WorkingtimesController::class,'destroy']);
// Route Employee
Route::get('/list-employee',[EmployeeAPIController::class,'getListEmployee']);
Route::get('/search-list-employee',[EmployeeAPIController::class,'searchListEmployee']);
Route::get('/add-employee',[EmployeeAPIController::class,'createEmployee']);
Route::post('/store-employee',[EmployeeAPIController::class,'storeEmployee']);
Route::get('/detail-employee/{id}',[EmployeeAPIController::class,'showDetailEmployee']);
Route::get('/detail-employee/{id}/edit',[EmployeeAPIController::class,'editEmployee']);
Route::put('/update-employee/{id}',[EmployeeAPIController::class,'updateEmployee']);
Route::delete('/delete-employee/{id}',[EmployeeAPIController::class,'deleteEmployee']);




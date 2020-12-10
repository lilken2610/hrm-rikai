<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        return $this->authService->doLogin($request);
    }

    public function logout(Request $request)
    {
        return $this->authService->doLogout($request);
    }

    public function user()
    {
        return $this->authService->user();
    }

    public function doSendResetPassword(Request $request)
    {
        return $this->authService->doSendResetPassword($request);
    }

    public function getChangePass($token)
    {
        return $this->authService->getChangePass($token);
    }


    public function postChangePass(Request $request)
    {
        return $this->authService->postChangePass($request);
    }

}

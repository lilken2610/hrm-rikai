<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function updateAvatar(Request $request)
    {
        return $this->userService->updateAvatar($request);
    }

    public function updateInfo(Request $request)
    {
        return $this->userService->doUpdateInfoAccount($request);
    }

    public function updatePasswordAccount(Request $request)
    {
        return $this->userService->doUpdatePasswordAccount($request);
    }

    public function index(Request $request)
    {
        return $this->userService->listUsers($request);
    }

    public function search(Request $request)
    {
        return $this->userService->searchUsers($request);
    }

    public function checkEmail(Request $request)
    {
        return $this->userService->checkEmail($request);
    }

    public function updateInfoById(Request $request, $id){
        return $this->userService->updateInfoById($request, $id);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->userService->createUser($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->userService->detailUser($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

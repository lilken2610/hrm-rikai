<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserService
{
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|max:999999',
        ]);

        $user = User::where('id', Auth::id())->get()->first();
        $user->avatar = $request->avatar;
        $user->updated_by = Auth::id();
        $user->save();
        return response()->json([
           'message' => 'Update avatar success',
           'avatar' => $request->avatar,
        ], 200);
    }

    public function showPageEditInfoAccount()
    {
        $user = User::where('id', Auth::id())->get()->first();
        $role = User::where('id', Auth::id())->get()->first()->role()->get()->first();
        $data = ['user' => $user, 'role' => $role];
        return $data;
    }

    public function doUpdateInfoAccount(Request $request)
    {
        $request->validate([
            'fullname' => 'required|min:10|max:255'
        ]);

        $user = User::where('id', Auth::id())->get()->first();
        $user->fullname = $request->fullname;
        $user->updated_by = Auth::id();
        $user->save();
        return response()->json([
           'message' => 'Update success',
           'user' => $user
        ], 200);
    }

    public function showPageEditPasswordAccount()
    {
        $user = User::where('id', Auth::id())->get()->first();
        return $user;
    }

    public function doUpdatePasswordAccount(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required|max:255',
            'newPassword' => 'required|min:10|max:255',
            'confirmPassword' => 'required|min:10|max:255'
        ]);

        $oldPassword = $request->oldPassword;
        $newPassword = $request->newPassword;
        $confirmPassword = $request->confirmPassword;
        if ($newPassword === $confirmPassword) {
            $user = User::where('id', Auth::id())->get()->first();
            $userPassword = $user->password;
            if (Hash::check($oldPassword, $userPassword) === true) {
                $user->password = Hash::make($confirmPassword);
                $user->updated_by = Auth::id();
                $user->save();
                return response()->json([
                    'message', 'Đổi mật khẩu thành công!'
                ], 200);
            } else {
                return response()->json([
                    'message', 'Mật khẩu hiện tại không đúng vui lòng thử lại!'
                ], 401);
            }
        } else {
            return response()->json([
                'message', 'Xác nhận mật khẩu không giống nhau!'
            ], 402);
        }
    }

    public function listUsers(Request $request){
        if ($request->record === null) {
            $record = 20;
        } else {
            $record = $request->record;
        }

        $allUsers =  User::where('deleted_at', null)->orderBy('id', 'desc')->paginate($record);
        $users = User::all();
        $total = $allUsers->total();

        $data = ['allUsers' => $allUsers, 'users' => $users, 'record' => $record, 'total'=> $total];
        return response()->json($data);
    }

    public function searchUsers(Request $request)
    {
        $users = User::all();
        $email = $request->email;
        $fullname = $request->fullname;
        $created_at = $request->created_at;
        $updated_at = $request->updated_at;
        $status = $request->status;
        $updated_by = $request->updated_by;

        $allUsers = User::query();

        if (!empty($email)) {
            $allUsers = $allUsers->where('email', 'like', '%' . $email . '%');
        }

        if (!empty($companyDescription)) {
            $allUsers = $allUsers->where('fullname', 'like', '%' . $fullname . '%');
        }

        if (!empty($created_at)) {
            $allUsers = $allUsers->whereDate('created_at', '=', $created_at);
        }

        if (!empty($updated_at)) {
            $allUsers = $allUsers->whereDate('updated_at', '=', $updated_at);
        }

        if (!empty($status)) {
            $allUsers = $allUsers->where('status', $status);
        }

        if (!empty($updated_by)) {
            $allUsers = $allUsers->where('updated_by', $updated_by);
        }

        if ($request->record === null) {
            $record = 20;
        } else {
            $record = $request->record;
        }

        $allUsers = $allUsers->where('deleted_at', null)->orderBy('id', 'desc')->paginate($record);

        $total = $allUsers->total();
        
        $data = ['allUsers' => $allUsers,'record' => $record, 'users' => $users, 'total'=> $total];
        return response()->json($data);
    }

    public function checkEmail(Request $request){
        $user = User::where('email', $request->email)->get()->first();
        if($user != null){
            return response()->json([
                'status' => 0
            ]);
        }else{
            return response()->json([
                'status' => 1
            ]);
        }
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'fullname' => 'required|min:10|max:255',
            'password' => 'required|min:10|max:255',
        ]);

        $user = new User;
        $user->email = $request->email;
        $user->fullname = $request->fullname;
        $user->password = Hash::make($request->password);
        $user->status = 1;
        $user->employee_id = $request->employee;
        $user->created_by = Auth::id();
        $user->updated_by = Auth::id();
        $user->save();
        return response()->json();
    }

    public function detailUser($id)
    {
        $user = User::where('id',$id)->get()->first();
        return response()->json($user);
    }

    public function updateInfoById(Request $request, $id){
        $request->validate([
            'fullname' => 'required|min:10|max:255'
        ]);
        $user = User::where('id', $id)->get()->first();;
        $user->fullname = $request->fullname;
        $user->status = $request->status;
        $user->updated_by = Auth::id();
        $user->save();
        return response()->json([
            'message' => 'Ok'
        ], 201);
    }
}

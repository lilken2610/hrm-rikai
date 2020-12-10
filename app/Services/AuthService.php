<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use App\Models\{User, PasswordReset};
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthService
{
    public function doLogin(Request $request){
        $validatedData = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validatedData->fails()) {
            return response()->json([
                'status' => 'fails',
                'message' => $validatedData->errors()->first(),
                'errors' => $validatedData->errors()->toArray(),
            ]);
        }

        $validatedData = request(['email', 'password']);

        if (!Auth::attempt($validatedData)) {
            return response()->json([
                'status' => 'failLogin',
                'message' => 'Sai tài khoản hoặc mật khẩu'
            ], 401);
        }else{
            if(Auth::user()->status != 1){
                Auth::logout();
                return response()->json([
                    'status' => 'failLogin',
                    'message' => 'Tài khoản của bạn đã bị khóa!'
                ], 401);
            }else{
                $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return response()->json([
            'status' => 'success',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
            ], 200);
            }
        }
    }

    public function doLogout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => 'success',
        ]);
    }

    public function user()
    {
        $user = Auth::user();
        return response()->json($user);
    }

    public function doSendResetPassword(Request $request)
    {
        $request->validate([
            'email' => 'email:rfc,dns',
        ]);

        $email = $request->email;

        $resultEmail = User::where('email', $email)->first();
        if (empty($resultEmail)) {
            return response()->json([
                'message'=> 'Email không đúng, vui lòng thử lại'
            ], 401);
        } else {
            $checkEmail = PasswordReset::where('email', $email)->orderBy('expiration_date', 'DESC')->get()->first();
            if($checkEmail != null && now() <= $checkEmail->expiration_date){
                return response()->json([
                    'message'=> 'Thư đổi mật khẩu đã tồn tại, vui lòng kiểm tra hoặc đợi sau 15 phút!'
                ], 401);
            }
            else
            {
            $resultName = User::where('email', $email)->first();
            $resultReset = new PasswordReset;
            $resultReset->email = $email;
            $resultReset->token = Str::random(80);
            $resultReset->expiration_date = now()->addMinutes(15);
            $resultReset->save();
            $this->email = $resultReset['email'];
            $this->token = $resultReset['token'];
            $this->name = $resultName['fullname'];
            Mail::send('emails.send_password', array('fullname' => $this->name, 'token' => $this->token), function ($message) {
                $message->to($this->email, $this->name)->subject('Lấy lại mật khẩu');
            });
            return response()->json([
                'message' => 'Link đổi mật khẩu đã gửi về email của bạn, vui lòng kiểm tra trong thư rác'
            ], 200);}
        }
    }

    public function getChangePass($token)
    {
        $result = PasswordReset::where('token', $token)->first();
        if (!empty($result)) {
            $resultDate = $result->expiration_date;
            if (now() <= $resultDate) {
                $token = $result['token'];
                return response()->json([
                    'message' => 'Đường dẫn được chấp nhận'
                ], 200);
            } else {
                PasswordReset::where('token', $token)->delete();
                return response()->json([
                    'message' => 'Đường dẫn không đúng'
                ], 403);
            }
        } else {
            return response()->json([
                'message' => 'Đường dẫn không đúng'
            ], 403);
        }
    }

    public function postChangePass(Request $request)
    {
        $request->validate([
            'password' => 'required', 'confirmed',
            're_password' => 'required'
        ]);

        $rePassword = $request['re_password'];
        $token = $request['token'];
        $checkToken = PasswordReset::where('token', $token)->get()->first();

        if ($checkToken) {
            $findEmail = PasswordReset::where('token', $token)->get()->first();
            $updatePassword = User::where('email', $findEmail->email)->first();
            $updatePassword->password = Hash::make($rePassword);
            $updatePassword->save();
            if ($updatePassword) {
                PasswordReset::where('token', $token)->delete();
                return response()->json([
                    'message' => 'Đổi mật khẩu thành công!'
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên!'
                ], 402);
            }
        } else {
            return response()->json([
                'message' => 'Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên!'
            ], 402);
        }
    }
}

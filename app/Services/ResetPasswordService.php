<?php

namespace App\Services;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ResetPasswordService
{
    public function showPageSendResetPassword()
    {
        return view('Auth.send_password');
    }


    public function doSendResetPassword(Request $request)
    {
        $request->validate([
            'email' => 'email:rfc,dns',
        ]);

        $email = $request->email;

        $resultEmail = User::where('email', $email)->first();
        if (empty($resultEmail)) {
            Session()->flash('message_email', 'Email không được tìm thấy vui lòng thử lại!');
            return redirect('/reset_password');
        } else {
            $resultName = User::where('email', $email)->first();
            $resultReset = new PasswordReset;
            $resultReset->email = $email;
            $resultReset->token = Str::random(80);
            $resultReset->expiration_date = now()->addMinutes(5);
            $resultReset->save();
            $this->email = $resultReset['email'];
            $this->token = $resultReset['token'];
            $this->name = $resultName['fullname'];
            Mail::send('emails.send_password', array('fullname' => $this->name, 'token' => $this->token), function ($message) {
                $message->to($this->email, $this->name)->subject('Lấy lại mật khẩu');
            });
            Session()->flash('message_ok', 'Email đổi mật khẩu đã gửi về email của bạn, có thể email ở trong hộp thư rác vui lòng kiểm tra!');
            return back();
        }
    }

    public function showPageChangePassword($token)
    {
        $result = PasswordReset::where('token', $token)->first();
        if (!empty($result)) {
            $resultDate = $result->expiration_date;
            if (now() <= $resultDate) {
                $token = $result['token'];
                return view('auth.form_change_password')->with('token', $token);
            } else {
                PasswordReset::where('token', $token)->delete();
                return abort('403');
            }
        } else {
            return abort('403');
        }
    }

    public function doChangePassword(Request $request)
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
                $this->name = $findEmail['fullname'];
                $this->email = $findEmail['email'];
                Mail::send('emails.confirm_reset_password', array('fullname' => $this->name, 'email' => $this->email), function ($message) {
                    $message->to($this->email, $this->name)->subject('Đổi mật khẩu thành công');
                });
                PasswordReset::where('token', $token)->delete();
                Session()->flash('message_ok', 'Đổi mật khẩu thành công!');
                return view('auth.success_change_password');
            } else {
                Session()->flash('message_error', 'Có lỗi xảy ra vui lòng liên hệ quản trị website!');
                return back();
            }
        } else {
            return abort('403');
        }
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Account;
use App\Models\AccountType;
use App\Models\LoginDetails;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class AccountController
{
    public function login(Request $request)
    {
        $body = $request->all();

        $email = $body['email'];
        $password = $body['password'];

        $credentials = [
            'email' => $email,
            'password' => $password
        ];

        if(Auth::attempt($credentials, true)){
            $request->session()->regenerate();
            $user = Auth::user();
            if ($user instanceof LoginDetails) {
                $name = $user->account->register->name;
                return response()->json([
                    'success' => true,
                    'message' => 'Logged in.',
                    'name' => $name,
                ]);
            } else {
                Log::info('AccountController@login: User is not an instance of LoginDetails');
                return response()->json([
                    'success' => false,
                    'message' => 'Internal server error.'
                ]);
            }
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect email or password.'
            ]);
        }
    }

    public function logout(Request $request)
    {
//        Auth::logout();
//        $request->session()->invalidate();
//        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out.'
        ]);
    }

    public function register(Request $reqeust)
    {
        $body = $reqeust->all();

        $username = $body['username'];
        $email = $body['email'];
        $password = $body['password'];
        $type = $body['type'];
        $hashedPassword = Hash::make($password);

        $conflict = LoginDetails::where('email', $email)
            ->exists();

        if($conflict){
            return response()->json([
                'success' => false,
                'message' => 'This email is already registered.'
            ]);
        }

        $loginDetails = new LoginDetails([
            'email' => $email,
            'password' => $hashedPassword
        ]);

        $loginDetails->save();

        $register = new Register([
            'name' => $username,
            'date' => date('Y-m-d H:i:s'),
            'login_id' => $loginDetails->login_id
        ]);

        $register->save();

        //TODO: search from db
        if($type == 'company'){
            $typeID = 'C';
        } else {
            $typeID = 'I';
        }

        $account = new Account([
            'type_id' => $typeID,
            'register_id' => $register->register_id,
            'login_id' => $loginDetails->login_id
        ]);

        $account->save();

        Auth::login($loginDetails, true);
        $user = Auth::user();
        if ($user instanceof LoginDetails) {
            $username = $user->account->register->name;
            return response()->json([
                'success' => true,
                'message' => 'Registered.',
                'name' => $username
            ]);
        } else {
            Log::info('AccountController@register: User is not an instance of LoginDetails');
            return response()->json([
                'success' => false,
                'message' => 'Internal server error.'
            ]);
        }
    }

    public function fetchUserInfo(){
        return response()->json($this->getUserInfo());
    }

    //TODO: validate email
    public function updateUserInfo(Request $request){
        $body = $request->all();

        $name = $body['name'];
        $email = $body['email'];
        $type = $body['type'];
        $newPassword = $body['password'];

        $user = Auth::user();
        try {
            if ($user instanceof LoginDetails) {

                if ($newPassword){
                    $user->password = Hash::make($newPassword);
                }

                if ($email){
                    $conflict = LoginDetails::where('email', $email)
                        ->where('login_id', '!=', $user->login_id)
                        ->exists();
                    if($conflict){
                        return response()->json([
                            'success' => false,
                            'message' => 'This email is already registered.'
                        ]);
                    }
                    $user->email = $email;
                }
                $user->save();


                if ($name) {
                    $register = $user->register;
                    $register->name = $name;
                    $register->save();
                }

                if($type){
                    $typeId = AccountType::query()->where('type_name', $type)->first()->type_id;
                    $user->account->type_id = $typeId;
                    $user->account->save();
                }

                $request->session()->regenerate();

                return response()->json($this->getUserInfo());

            } else {
                Log::info('AccountController@updateUserInfo: User is not an instance of LoginDetails');
                return response()->json([
                    'success' => false,
                    'message' => 'Internal server error.'
                ]);
            }
        } catch (\Exception $e) {
            Log::error('AccountController@updateUserInfo: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Internal server error.'
            ]);
        }
    }

    private function getUserInfo(){
        $user = Auth::user();
        if ($user instanceof LoginDetails) {
            $name = $user->account->register->name;
            $email = $user->email;
            $typeId = $user->account->type_id;
            $type = AccountType::class::query()->where('type_id', $typeId)->first()->type_name;
            $selectableTypes = AccountType::query()->get()->pluck('type_name');

            return [
                'success' => true,
                'message' => [
                    'user_info' => [
                        'name' => $name,
                        'email' => $email,
                        'type' => $type
                    ],
                    'selectable_types' => $selectableTypes
                ],
            ];

        } else {
            Log::info('AccountController@getUserInfo: User is not an instance of LoginDetails');
            return [
                'success' => false,
                'message' => 'Internal server error.'
            ];
        }
    }
}

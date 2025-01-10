<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Cookie;
use App\Models\Account;
use App\Models\LoginDetails;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AccountController 
{
    //TODO: implement Cookie & jwtToken
    public function login(Request $request)
    {
        $success = false;
        $body = $request->all();
        
        $email = $body['email'];
        $password = $body['password'];
        $hashedPassword = Hash::make($password);

        $loginDetails = LoginDetails::where('email', $email)->first();

        if(!$loginDetails){
            return response()->json([
                'success' => false,
                'message' => 'Account not found.'
            ]);
        } else {
            $hashedPassword = $loginDetails->Password;
            $success = Hash::check($password, $hashedPassword);
            $name = $loginDetails->account->register->name; 
        }

        if ($success){
            // Cookie::queue("username", "", 60 * 24 * 7); 
            return response()->json([
                'success' => true,
                'message' => 'Logged in.',
                'name' => $name,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Incorrect password.'
            ]);
        }
    }

    public function logout(Request $reqeust)
    {
        // Cookie::queue(Cookie::forget('token'));

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
                'message' => 'Conflict.'
            ]);
        }
        
        $loginDetails = new LoginDetails([
            'email' => $email,
            'Password' => $hashedPassword
        ]);

        $loginDetails->save();

        $register = new Register([
            'name' => $username, 
            'date' => date('Y-m-d H:i:s'),
            'login_id' => $loginDetails->login_id
        ]);

        $register->save();

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

        return response()->json([
            'success' => true,
            'message' => 'Registered.',
            'name' => $username
        ]);
    }
}

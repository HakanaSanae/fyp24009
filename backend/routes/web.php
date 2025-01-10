<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Routing\Router;
use App\Actions\LoginAction;
use App\Http\Controllers\AccountController; 

$router = app()->get('router');

// Route::get('/', function () {
//     return view('welcome');
// });

// $router->prefix('api')->group(
//     function (Router $router) {
//         $router->post('/login', [AccountController::class, 'login']);
//         $router->post('/register', [AccountController::class, 'register']);
//         $router->get('/logout', [AccountController::class, 'logout']);
//     }
// );


$router->get('sanctum/csrf-cookie', function(){
    return response()->json([
        'message' => 'CSRF cookie fetched.'
    ]);
}); 


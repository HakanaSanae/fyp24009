<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController; 

$router = app()->get('router');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

$router->post('/login', [AccountController::class, 'login']);
$router->post('/register', [AccountController::class, 'register']);
$router->get('/logout', [AccountController::class, 'logout']);

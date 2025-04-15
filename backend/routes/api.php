<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\fileUploadController;

$router = app()->get('router');

$router->post('/login', [AccountController::class, 'login']);
$router->post('/register', [AccountController::class, 'register']);
$router->get('/me', [AccountController::class, 'getMe']);

$router->middleware(['auth']) -> group(
    function ( $router ) {
        $router->get('/logout', [AccountController::class, 'logout']);
        $router->post('/performance-analysis', [fileUploadController::class, 'performanceAnalysis']);
        $router->get('/user-info', [AccountController::class, 'fetchUserInfo']);
        $router->put('/update-user-info', [AccountController::class, 'updateUserInfo']);
    }
);


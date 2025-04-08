<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\fileUploadController;

$router = app()->get('router');

$router->post('/login', [AccountController::class, 'login']);
$router->post('/register', [AccountController::class, 'register']);

$router->middleware(['auth']) -> group(
    function ( $router ) {
        $router->get('/logout', [AccountController::class, 'logout']);
        $router->post('/risk-analysis', [fileUploadController::class, 'riskAnalysis']);
        $router->get('/user-info', [AccountController::class, 'getUserInfo']);
        $router->put('/update-user-info', [AccountController::class, 'updateUserInfo']);

    }
);


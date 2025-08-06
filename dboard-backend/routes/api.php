<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class,'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    // ユーザーの通常CRUD
    Route::apiResource('users', UserController::class);
    // オンラインユーザーの一覧ルート
    Route::get('/online-users', [UserController::class, 'onLineUsers']);
    // ログイン中ユーザーの複数選択削除
    Route::post('/bulk-delete', [UserController::class, 'bulkDelete']);
});

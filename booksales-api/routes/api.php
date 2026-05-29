<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

/*
|--------------------------------------------------------------------------
| API Routes — BookSales
|--------------------------------------------------------------------------
| apiResource menghasilkan 5 route standar REST:
|   GET    /resource          → index()
|   POST   /resource          → store()
|   GET    /resource/{id}     → show()
|   PUT    /resource/{id}     → update()
|   DELETE /resource/{id}     → destroy()
*/

Route::apiResource('genres',  GenreController::class);
Route::apiResource('authors', AuthorController::class);
Route::apiResource('books',   BookController::class)->only(['index', 'show']);

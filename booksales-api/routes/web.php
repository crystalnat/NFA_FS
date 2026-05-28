<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\AuthorController;

Route::get('/', function () {
    return redirect('/genres');
});

// Genre routes
Route::get('/genres',        [GenreController::class, 'index']);
Route::get('/genres/{id}',   [GenreController::class, 'show']);

// Author routes
Route::get('/authors',       [AuthorController::class, 'index']);
Route::get('/authors/{id}',  [AuthorController::class, 'show']);

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

/*
|--------------------------------------------------------------------------
| API Routes — BookSales
|--------------------------------------------------------------------------
| Semua endpoint diakses dengan prefix /api/
| Contoh: GET http://localhost:8000/api/books
*/

// Books
Route::get('/books',        [BookController::class,   'index']);
Route::get('/books/{id}',   [BookController::class,   'show']);

// Authors
Route::get('/authors',      [AuthorController::class, 'index']);
Route::post('/authors',     [AuthorController::class, 'store']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);

// Genres
Route::get('/genres',       [GenreController::class,  'index']);
Route::post('/genres',      [GenreController::class,  'store']);
Route::get('/genres/{id}',  [GenreController::class,  'show']);

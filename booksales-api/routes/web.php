<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

Route::get('/', fn() => redirect('/books'));

// Books
Route::get('/books',        [BookController::class,   'index']);
Route::get('/books/{id}',   [BookController::class,   'show']);

// Authors
Route::get('/authors',      [AuthorController::class, 'index']);
Route::get('/authors/{id}', [AuthorController::class, 'show']);

// Genres (static array)
Route::get('/genres',       [GenreController::class,  'index']);
Route::get('/genres/{id}',  [GenreController::class,  'show']);

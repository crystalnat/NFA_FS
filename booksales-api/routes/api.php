<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;

/*
|--------------------------------------------------------------------------
| API Routes — BookSales
|--------------------------------------------------------------------------
|
| PUBLIK  (tanpa autentikasi) : index, show
| ADMIN   (header X-Admin-Token: booksales-admin-2025) : store, update, destroy
|
*/

// ── PUBLIK — dapat diakses siapa saja ──────────────────────────────────
Route::apiResource('genres',  GenreController::class)->only(['index', 'show']);
Route::apiResource('authors', AuthorController::class)->only(['index', 'show']);
Route::apiResource('books',   BookController::class)->only(['index', 'show']);

// ── ADMIN — hanya admin dengan X-Admin-Token yang valid ────────────────
Route::middleware('admin')->group(function () {
    Route::apiResource('genres',  GenreController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('authors', AuthorController::class)->only(['store', 'update', 'destroy']);
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes — BookSales
|--------------------------------------------------------------------------
|
| PUBLIK  (tanpa autentikasi)                          : index, show
| ADMIN   (header X-Admin-Token: booksales-admin-2025) : store, update, destroy
| CUSTOMER (Bearer token Sanctum)                      : transactions CRUD
|
*/

// ── AUTH — register / login / logout ───────────────────────────────────
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// ── PUBLIK — dapat diakses siapa saja ──────────────────────────────────
Route::apiResource('genres',  GenreController::class)->only(['index', 'show']);
Route::apiResource('authors', AuthorController::class)->only(['index', 'show']);
Route::apiResource('books',   BookController::class)->only(['index', 'show']);

// ── ADMIN — hanya admin dengan X-Admin-Token yang valid ────────────────
Route::middleware('admin')->group(function () {
    Route::apiResource('genres',  GenreController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('authors', AuthorController::class)->only(['store', 'update', 'destroy']);

    // Read All & Destroy transaksi → admin only
    Route::get('transactions',                  [TransactionController::class, 'index']);
    Route::delete('transactions/{transaction}', [TransactionController::class, 'destroy']);
});

// ── CUSTOMER — hanya customer yang sudah login (Sanctum) ───────────────
Route::middleware('auth:sanctum')->group(function () {
    // Create, Show, Update transaksi → customer terotentikasi
    Route::post('transactions',                   [TransactionController::class, 'store']);
    Route::get('transactions/{transaction}',       [TransactionController::class, 'show']);
    Route::put('transactions/{transaction}',       [TransactionController::class, 'update']);
    Route::patch('transactions/{transaction}',     [TransactionController::class, 'update']);
});

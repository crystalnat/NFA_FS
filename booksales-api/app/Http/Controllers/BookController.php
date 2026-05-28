<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\JsonResponse;

class BookController extends Controller
{
    /**
     * GET /api/books
     * Mengembalikan semua data buku beserta author-nya.
     */
    public function index(): JsonResponse
    {
        $books = Book::with('author')->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data buku berhasil diambil.',
            'total'   => $books->count(),
            'data'    => $books,
        ]);
    }

    /**
     * GET /api/books/{id}
     * Mengembalikan detail satu buku berdasarkan ID.
     */
    public function show(int $id): JsonResponse
    {
        $book = Book::with('author')->find($id);

        if (!$book) {
            return response()->json([
                'status'  => 'error',
                'message' => "Buku dengan ID {$id} tidak ditemukan.",
            ], 404);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Detail buku berhasil diambil.',
            'data'    => $book,
        ]);
    }
}

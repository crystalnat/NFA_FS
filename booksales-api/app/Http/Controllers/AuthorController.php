<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\JsonResponse;

class AuthorController extends Controller
{
    /**
     * GET /api/authors
     * Mengembalikan semua data author beserta jumlah bukunya.
     */
    public function index(): JsonResponse
    {
        $authors = Author::withCount('books')->get();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data author berhasil diambil.',
            'total'   => $authors->count(),
            'data'    => $authors,
        ]);
    }

    /**
     * GET /api/authors/{id}
     * Mengembalikan detail satu author beserta daftar bukunya.
     */
    public function show(int $id): JsonResponse
    {
        $author = Author::with('books')->find($id);

        if (!$author) {
            return response()->json([
                'status'  => 'error',
                'message' => "Author dengan ID {$id} tidak ditemukan.",
            ], 404);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Detail author berhasil diambil.',
            'data'    => $author,
        ]);
    }
}

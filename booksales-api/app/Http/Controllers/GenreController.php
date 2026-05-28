<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\JsonResponse;

class GenreController extends Controller
{
    /**
     * GET /api/genres
     * Mengembalikan semua data genre.
     */
    public function index(): JsonResponse
    {
        $genres = Genre::all();

        return response()->json([
            'status'  => 'success',
            'message' => 'Data genre berhasil diambil.',
            'total'   => count($genres),
            'data'    => $genres,
        ]);
    }

    /**
     * GET /api/genres/{id}
     * Mengembalikan detail satu genre berdasarkan ID.
     */
    public function show(int $id): JsonResponse
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'status'  => 'error',
                'message' => "Genre dengan ID {$id} tidak ditemukan.",
            ], 404);
        }

        return response()->json([
            'status'  => 'success',
            'message' => 'Detail genre berhasil diambil.',
            'data'    => $genre,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
            'total'   => $genres->count(),
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

    /**
     * POST /api/genres
     * Menambahkan genre baru.
     *
     * Body (JSON):
     *   { "name": "Kotlin", "description": "..." }
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:100|unique:genres,name',
            'description' => 'nullable|string|max:500',
        ]);

        $genre = Genre::create($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Genre berhasil ditambahkan.',
            'data'    => $genre,
        ], 201);
    }
}

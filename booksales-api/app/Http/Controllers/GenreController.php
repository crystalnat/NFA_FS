<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    /**
     * GET /api/genres
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
     * POST /api/genres
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

    /**
     * GET /api/genres/{genre}
     */
    public function show(Genre $genre): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Detail genre berhasil diambil.',
            'data'    => $genre,
        ]);
    }

    /**
     * PUT/PATCH /api/genres/{genre}
     */
    public function update(Request $request, Genre $genre): JsonResponse
    {
        $validated = $request->validate([
            'name'        => 'sometimes|required|string|max:100|unique:genres,name,' . $genre->id,
            'description' => 'nullable|string|max:500',
        ]);

        $genre->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Genre berhasil diperbarui.',
            'data'    => $genre,
        ]);
    }

    /**
     * DELETE /api/genres/{genre}
     */
    public function destroy(Genre $genre): JsonResponse
    {
        $name = $genre->name;
        $genre->delete();

        return response()->json([
            'status'  => 'success',
            'message' => "Genre \"{$name}\" berhasil dihapus.",
        ]);
    }
}

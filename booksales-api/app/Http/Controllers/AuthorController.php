<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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

    /**
     * POST /api/authors
     * Menambahkan author baru.
     *
     * Body (JSON):
     *   { "name": "...", "email": "...", "bio": "..." }
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:150',
            'email' => 'required|email|unique:authors,email',
            'bio'   => 'nullable|string|max:1000',
        ]);

        $author = Author::create($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Author berhasil ditambahkan.',
            'data'    => $author,
        ], 201);
    }
}

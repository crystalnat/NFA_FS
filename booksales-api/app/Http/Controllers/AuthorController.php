<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    /**
     * GET /api/authors
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
     * POST /api/authors
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

    /**
     * GET /api/authors/{author}
     */
    public function show(Author $author): JsonResponse
    {
        $author->loadCount('books')->load('books');

        return response()->json([
            'status'  => 'success',
            'message' => 'Detail author berhasil diambil.',
            'data'    => $author,
        ]);
    }

    /**
     * PUT/PATCH /api/authors/{author}
     */
    public function update(Request $request, Author $author): JsonResponse
    {
        $validated = $request->validate([
            'name'  => 'sometimes|required|string|max:150',
            'email' => 'sometimes|required|email|unique:authors,email,' . $author->id,
            'bio'   => 'nullable|string|max:1000',
        ]);

        $author->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Author berhasil diperbarui.',
            'data'    => $author,
        ]);
    }

    /**
     * DELETE /api/authors/{author}
     */
    public function destroy(Author $author): JsonResponse
    {
        $name = $author->name;
        $author->delete();

        return response()->json([
            'status'  => 'success',
            'message' => "Author \"{$name}\" berhasil dihapus.",
        ]);
    }
}

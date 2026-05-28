<?php

namespace App\Http\Controllers;

use App\Models\Genre;

class GenreController extends Controller
{
    /**
     * Menampilkan daftar semua genre.
     */
    public function index()
    {
        $genres = Genre::all();

        return view('genres.index', compact('genres'));
    }

    /**
     * Menampilkan detail satu genre berdasarkan ID.
     */
    public function show(int $id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            abort(404, 'Genre tidak ditemukan.');
        }

        return view('genres.show', compact('genre'));
    }
}

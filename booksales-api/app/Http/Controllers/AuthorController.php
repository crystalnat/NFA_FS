<?php

namespace App\Http\Controllers;

use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Menampilkan daftar semua author.
     */
    public function index()
    {
        $authors = Author::all();

        return view('authors.index', compact('authors'));
    }

    /**
     * Menampilkan detail satu author berdasarkan ID.
     */
    public function show(int $id)
    {
        $author = Author::find($id);

        if (!$author) {
            abort(404, 'Author tidak ditemukan.');
        }

        return view('authors.show', compact('author'));
    }
}

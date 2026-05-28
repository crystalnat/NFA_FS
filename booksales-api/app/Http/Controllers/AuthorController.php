<?php

namespace App\Http\Controllers;

use App\Models\Author;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::withCount('books')->get();

        return view('authors.index', compact('authors'));
    }

    public function show(int $id)
    {
        $author = Author::with('books')->findOrFail($id);

        return view('authors.show', compact('author'));
    }
}

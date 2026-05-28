<?php

namespace App\Http\Controllers;

use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('author')->get();

        return view('books.index', compact('books'));
    }

    public function show(int $id)
    {
        $book = Book::with('author')->findOrFail($id);

        return view('books.show', compact('book'));
    }
}

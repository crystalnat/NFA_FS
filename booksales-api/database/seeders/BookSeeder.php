<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Book;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title'       => 'Belajar JavaScript Dasar',
                'author_id'   => 1,
                'year'        => 2021,
                'price'       => 89000,
                'category'    => 'JavaScript',
                'description' => 'Panduan lengkap untuk pemula yang ingin belajar JavaScript dari nol.',
                'image'       => 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
            ],
            [
                'title'       => 'React untuk Pemula',
                'author_id'   => 2,
                'year'        => 2022,
                'price'       => 115000,
                'category'    => 'React',
                'description' => 'Mengenal konsep dan praktik membuat aplikasi React modern.',
                'image'       => 'https://covers.openlibrary.org/b/id/10521270-L.jpg',
            ],
            [
                'title'       => 'Menguasai Node.js',
                'author_id'   => 3,
                'year'        => 2022,
                'price'       => 99000,
                'category'    => 'Backend',
                'description' => 'Membangun server dan REST API handal menggunakan Node.js dan Express.',
                'image'       => 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
            ],
            [
                'title'       => 'CSS & Tailwind Modern',
                'author_id'   => 4,
                'year'        => 2023,
                'price'       => 79000,
                'category'    => 'CSS',
                'description' => 'Panduan styling web profesional dengan CSS dan Tailwind CSS.',
                'image'       => 'https://covers.openlibrary.org/b/id/9255566-L.jpg',
            ],
            [
                'title'       => 'TypeScript Komprehensif',
                'author_id'   => 5,
                'year'        => 2023,
                'price'       => 125000,
                'category'    => 'TypeScript',
                'description' => 'Kuasai TypeScript untuk membangun aplikasi yang lebih aman dan terstruktur.',
                'image'       => 'https://covers.openlibrary.org/b/id/10776603-L.jpg',
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}

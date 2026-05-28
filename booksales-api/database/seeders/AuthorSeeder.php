<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Author;

class AuthorSeeder extends Seeder
{
    public function run(): void
    {
        $authors = [
            [
                'name'  => 'Andi Prasetyo',
                'email' => 'andi@booksales.id',
                'bio'   => 'Pengembang web senior dengan 10 tahun pengalaman di bidang JavaScript dan Vue.js.',
            ],
            [
                'name'  => 'Dina Sari',
                'email' => 'dina@booksales.id',
                'bio'   => 'Frontend engineer spesialis React dan desain antarmuka pengguna modern.',
            ],
            [
                'name'  => 'Budi Santoso',
                'email' => 'budi@booksales.id',
                'bio'   => 'Backend developer berpengalaman di Node.js, Python, dan arsitektur microservices.',
            ],
            [
                'name'  => 'Rina Marlina',
                'email' => 'rina@booksales.id',
                'bio'   => 'UI/UX designer dan CSS specialist, kontributor aktif open source.',
            ],
            [
                'name'  => 'Maya Putri',
                'email' => 'maya@booksales.id',
                'bio'   => 'Full-stack developer dengan fokus pada TypeScript dan sistem bertipe kuat.',
            ],
        ];

        foreach ($authors as $author) {
            Author::create($author);
        }
    }
}

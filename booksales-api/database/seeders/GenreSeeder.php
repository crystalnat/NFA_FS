<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Genre;

class GenreSeeder extends Seeder
{
    public function run(): void
    {
        $genres = [
            ['name' => 'JavaScript', 'description' => 'Bahasa pemrograman web paling populer di dunia.'],
            ['name' => 'React',      'description' => 'Library UI berbasis komponen dari Meta.'],
            ['name' => 'Backend',    'description' => 'Pengembangan sisi server dan REST API.'],
            ['name' => 'Database',   'description' => 'Perancangan dan pengelolaan basis data relasional.'],
            ['name' => 'Python',     'description' => 'Bahasa serbaguna untuk data science dan backend.'],
        ];

        foreach ($genres as $genre) {
            Genre::create($genre);
        }
    }
}

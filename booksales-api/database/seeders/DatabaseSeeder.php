<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Author harus di-seed lebih dulu karena books butuh author_id
        $this->call([
            GenreSeeder::class,
            AuthorSeeder::class,
            BookSeeder::class,
        ]);
    }
}

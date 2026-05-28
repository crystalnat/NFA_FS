<?php

namespace App\Models;

class Genre
{
    /**
     * Mengembalikan seluruh data genre (simulasi database).
     */
    public static function all(): array
    {
        return [
            [
                'id'          => 1,
                'name'        => 'JavaScript',
                'description' => 'Bahasa pemrograman web paling populer di dunia.',
            ],
            [
                'id'          => 2,
                'name'        => 'React',
                'description' => 'Library UI berbasis komponen dari Meta.',
            ],
            [
                'id'          => 3,
                'name'        => 'Backend',
                'description' => 'Pengembangan sisi server dan REST API.',
            ],
            [
                'id'          => 4,
                'name'        => 'Database',
                'description' => 'Perancangan dan pengelolaan basis data relasional.',
            ],
            [
                'id'          => 5,
                'name'        => 'Python',
                'description' => 'Bahasa serbaguna untuk data science dan backend.',
            ],
        ];
    }

    /**
     * Mencari genre berdasarkan ID.
     */
    public static function find(int $id): ?array
    {
        $all = self::all();
        foreach ($all as $genre) {
            if ($genre['id'] === $id) {
                return $genre;
            }
        }
        return null;
    }
}

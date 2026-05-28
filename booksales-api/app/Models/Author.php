<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name', 'email', 'bio'];

    /**
     * Relasi: satu author memiliki banyak buku.
     */
    public function books()
    {
        return $this->hasMany(Book::class);
    }
}

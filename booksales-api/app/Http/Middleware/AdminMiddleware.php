<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * AdminMiddleware
 *
 * Melindungi endpoint yang hanya boleh diakses oleh admin.
 *
 * Cara penggunaan di Postman:
 *   Header → X-Admin-Token : booksales-admin-2025
 *
 * Dalam aplikasi nyata, token ini diganti dengan sistem autentikasi
 * penuh seperti Laravel Sanctum atau JWT.
 */
class AdminMiddleware
{
    // Token statis admin — dalam produksi simpan di .env
    private const ADMIN_TOKEN = 'booksales-admin-2025';

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->header('X-Admin-Token');

        if ($token !== self::ADMIN_TOKEN) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akses ditolak. Endpoint ini hanya dapat diakses oleh admin.',
                'hint'    => 'Sertakan header X-Admin-Token yang valid.',
            ], 403);
        }

        return $next($request);
    }
}

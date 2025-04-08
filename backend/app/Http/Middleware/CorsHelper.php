<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CorsHelper
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', env('APP_URL')];
        $origin = $request->headers->get('Origin');

        $headers = [
            'Access-Control-Allow-Methods' => '*',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Headers' => 'X-Requested-With,Content-Type,X-Token-Auth,Authorization,X-XSRF-TOKEN',
            'Accept' => 'application/json',
        ];

        if (in_array($origin, $allowedOrigins)) {
            $headers['Access-Control-Allow-Origin'] = $origin;
        }

        if ($request->isMethod('OPTIONS')) {
            return response('', 204)
                ->withHeaders($headers);
        }

        return $next($request)
            ->withHeaders($headers);
    }
}

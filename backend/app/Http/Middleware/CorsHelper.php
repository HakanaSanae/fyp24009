<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
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
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => '*',
            'Access-Control-Allow-Credentials' => true,
            'Access-Control-Allow-Headers' => 'X-Requested-With,Content-Type,X-Token-Auth,Authorization',
            'Accept' => 'application/json',
        ];

        if ($request->isMethod('OPTIONS')) {
            return response()->json(['status' => 'OK'], 200)
                ->withHeaders([
                    'Access-Control-Allow-Origin' => '*',
                    'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS, PUT, DELETE',
                    'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
                ]);
        }

        return $next($request)
            ->withHeaders($headers);
    }
}

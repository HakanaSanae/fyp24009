<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class fileUploadController {
    public function riskAnalysis(Request $request)
    {
        $file = $request->file('file')->store('risk-analysis');

        return response()->json([
            'success' => true,
            'message' => 'File uploaded successfully.',
        ]);
    }
}
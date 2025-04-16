<?php

namespace App\Http\Controllers;

use CURLFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class fileUploadController
{
    public function performanceAnalysis(Request $request)
    {
        ini_set('max_execution_time', 300);

        //TODO: store fileName and filePath in database for retrieving later
//        $filePath = $request->get('file_path');
//        $fileName = $request->get('file_name');
        $file = $request->file('file');

//        Log::info('File Path: ' . $filePath);
//        Log::info('File Name: ' . $fileName);

        try {
            $ch = curl_init();

            $postData = [
                'file' => new CURLFile($file->getRealPath()),
            ];

            curl_setopt_array($ch, [
                CURLOPT_URL => 'https://silverpig8822.pythonanywhere.com/extract',
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_POSTFIELDS => $postData,
                CURLOPT_CAINFO => realpath(base_path('certs/cacert.pem'))
            ]);

            $response = curl_exec($ch);
            if (curl_errno($ch)) {
                Log::error('Curl error: ' . curl_error($ch));
                return response()->json([
                    'success' => false,
                    'message' => 'Error processing the file.',
                ]);
            }
            curl_close($ch);

            $response = json_decode($response, true);
            $result = json_decode($response['result'], true);

            Log::info('Result: ' . json_encode($result));

            $data = [
                "Total_Performance_Level"=> $result['total_score'],
                "E" => [
                    "Performance_Level" => $result['e_score'],
                    "Explanation" => $result['e_explanation'],
                    "Suggestion" => $result['e_suggestion'],
                ],
                'S' => [
                    "Performance_Level" => $result['s_score'],
                    "Explanation" => $result['s_explanation'],
                    "Suggestion" => $result['s_suggestion'],
                ],
                'G' => [
                    "Performance_Level" => $result['g_score'],
                    "Explanation" => $result['g_explanation'],
                    "Suggestion" => $result['g_suggestion']
                ]
            ];

            return response()->json([
                'success' => true,
                'message' => $data,
            ]);

        } catch (\Exception $e) {
            Log::error('Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error processing the file.',
            ]);
        }
    }
}

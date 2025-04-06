<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class fileUploadController
{
    public function riskAnalysis(Request $request)
    {
        //TODO: send pdf to Andrew's API
        $file = $request->file('file')->store('risk-analysis', 'public');


        $data = [
            "Total_Risk_Level"=> 1,
            "E" => [
                "Risk_Level" => 1,
                "Explanation" => "The company did a great job in reducing carbon emission . ",
                "Suggestion" => "The company can focus more on energy management . ",
            ],
            'S' => [
                "Risk_Level" => 1,
                "Explanation" => "The company changed policy to promote labor rights . ",
                "Suggestion" => "Focus more on DEI.",
            ],
            'G' => [
                "Risk_Level" => 1,
                "Explanation" => "The Board of Directors solve the conflict effectively in this year.",
                "Suggestion" => "As all members in the Board are male, they company and appoint and add more female talents to the Board . "
            ]
        ];

        return response()->json([
            'success' => true,
            'message' => $data,
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class accountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('ACCOUNT_TYPE')->insert([
            [
                'type_id' => 'C',
                'type_name' => 'Company',
            ], [
                'type_id' => 'I',
                'type_name' => 'Individual',
            ]
        ]);
    }
}

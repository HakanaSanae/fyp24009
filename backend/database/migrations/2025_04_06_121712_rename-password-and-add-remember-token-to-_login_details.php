<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('LOGIN_DETAILS', function (Blueprint $table) {
            $table->renameColumn('Password', 'password');
            $table->string('remember_token', 100)->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('LOGIN_DETAILS', function (Blueprint $table) {
            $table->renameColumn('password', 'Password');
            $table->dropColumn('remember_token');
        });
    }
};

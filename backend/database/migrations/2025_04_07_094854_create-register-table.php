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
        Schema::create('REGISTER', function (Blueprint $table) {
            $table->bigIncrements('register_id');
            $table->string('name');
            $table->DateTime('date');
            $table->unsignedBigInteger('login_id');

            $table->foreign('login_id')->references('login_id')->on('LOGIN_DETAILS');
            $table->index('login_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('REGISTER');
    }
};

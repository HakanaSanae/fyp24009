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
        Schema::create('ACCOUNTS', function (Blueprint $table) {
            $table->bigIncrements('account_id');
            $table->string('type_id')->nullable();
            $table->unsignedBigInteger('register_id')->nullable();
            $table->unsignedBigInteger('login_id')->nullable();

            $table->foreign('type_id')->references('type_id')->on('ACCOUNT_TYPE');
            $table->foreign('register_id')->references('register_id')->on('REGISTER');
            $table->foreign('login_id')->references('login_id')->on('LOGIN_DETAILS');

            $table->index('login_id');
            $table->index('register_id');
            $table->index('type_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ACCOUNTS');
    }
};

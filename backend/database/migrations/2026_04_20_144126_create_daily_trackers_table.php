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
        Schema::create('daily_trackers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->date('date');
            $table->string('task');
            $table->time('start_time');
            $table->time('end_time')->nullable();
            $table->time('duration')->nullable();
            $table->boolean('status')->default(true);
            $table->text('output')->nullable();
            $table->string('category');
            $table->string('evaluation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_trackers');
    }
};

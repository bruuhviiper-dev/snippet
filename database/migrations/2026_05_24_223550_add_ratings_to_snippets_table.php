<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('snippets', function (Blueprint $table) {
            $table->unsignedInteger('rating_sum')->default(0)->after('views');
            $table->unsignedInteger('rating_count')->default(0)->after('rating_sum');
        });
    }

    public function down(): void
    {
        Schema::table('snippets', function (Blueprint $table) {
            $table->dropColumn(['rating_sum', 'rating_count']);
        });
    }
};

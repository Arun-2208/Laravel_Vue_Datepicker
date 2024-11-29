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
        Schema::create('shop_categories_products', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('category_id')
                  ->constrained('shop_categories') 
                  ->OnDelete('no action')
                  ->OnUpdate('no action');
            $table->foreignId('product_id')
                  ->constrained('products') 
                  >OnDelete('no action')
                  ->OnUpdate('no action');
            $table->timestamps(); 
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shop_categories_products');
    }
};

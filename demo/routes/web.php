<?php

use Illuminate\Support\Facades\Route;

use App\Models\products;


Route::get('/offers-page/{input?}', function ($input = null) {
    $products = products::all(); 

    return view('offers-page', [
        'products' => $products,
        'input' => $input, 
    ]);
})->name('offers.page');


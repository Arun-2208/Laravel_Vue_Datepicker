<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\products;


class OffersController extends Controller
{
    public function index()
    {
        $products = products::all();

        return view('offers-page', compact('products'));
    }
}

<?php

namespace App\Filament\Resources\ProductsResource\Pages;

use App\Filament\Resources\ProductsResource;
use Filament\Resources\Pages\Page;

use App\Models\products;

class offersPage extends Page
{
    protected static string $resource = ProductsResource::class;

    protected static string $view = 'offers-page';

    protected static ?string $navigationLabel = 'Product Offers';  
    protected static ?string $navigationIcon = 'heroicon-o-cash';
    protected static ?string $navigationGroup = 'Shop';

    
}

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Filament\Facades\Filament;
use App\Filament\Resources\ProductsResource\Widgets\StatsOverview;
use App\Filament\Resources\ProductsResource\Widgets\SalesChart;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Filament::registerWidgets([
            StatsOverview::class,
            SalesChart::class
        ]);
    }
}

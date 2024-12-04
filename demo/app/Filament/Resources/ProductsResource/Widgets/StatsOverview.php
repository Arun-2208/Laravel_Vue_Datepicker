<?php

namespace App\Filament\Resources\ProductsResource\Widgets;


use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected ?string $heading = 'Products sales Data Analytics';
    protected ?string $description = 'An overview of some monthly sales Data';
    protected function getStats(): array
    {
        return [
            Stat::make('Max sales','193.6k')
            ->description('maximum product sales for this month')
            ->descriptionIcon('heroicon-m-arrow-trending-up')
            ->chart([1,3,5,7])
            ->color('success')
            ->extraAttributes([
                'class' => 'cursor-pointer',
                'wire:click' => "\$dispatch('setStatusFilter', { filter: 'processed' })",
            ]),

            Stat::make('Sales Growth Rate','56%')
            ->description('Sales growth rate')
            ->descriptionIcon('heroicon-m-arrow-trending-up')
            ->chart([1,14,32,64])
            ->color('success')
            ->extraAttributes([
                'class' => 'cursor-pointer',
                'wire:click' => "\$dispatch('setStatusFilter', { filter: 'processed' })"])

        ];
    }
}

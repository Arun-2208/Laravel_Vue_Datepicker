<?php

namespace App\Filament\Resources\ProductsResource\Widgets;

use Filament\Widgets\ChartWidget;

class SalesChart extends ChartWidget
{
    protected static ?string $heading = 'Chart';

    protected function getData(): array
    {
        return [
            'datasets' =>[

                [
                'label'=>'Sales for every Month',
                'data' =>[10000,4500,3400,12000,9800,5600,9700,1200,5000,6000,200,4200],
                'backgroundColor' => '#ff8000',
                'borderColor' => '#9BD0F5'
            ],
        ],
            'labels' =>['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}

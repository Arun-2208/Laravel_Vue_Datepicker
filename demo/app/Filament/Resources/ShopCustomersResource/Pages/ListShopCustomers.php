<?php

namespace App\Filament\Resources\ShopCustomersResource\Pages;

use App\Filament\Resources\ShopCustomersResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListShopCustomers extends ListRecords
{
    protected static string $resource = ShopCustomersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

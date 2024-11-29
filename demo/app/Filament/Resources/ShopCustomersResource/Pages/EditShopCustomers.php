<?php

namespace App\Filament\Resources\ShopCustomersResource\Pages;

use App\Filament\Resources\ShopCustomersResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditShopCustomers extends EditRecord
{
    protected static string $resource = ShopCustomersResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

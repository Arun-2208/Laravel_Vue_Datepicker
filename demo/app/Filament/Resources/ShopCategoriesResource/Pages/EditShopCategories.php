<?php

namespace App\Filament\Resources\ShopCategoriesResource\Pages;

use App\Filament\Resources\ShopCategoriesResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditShopCategories extends EditRecord
{
    protected static string $resource = ShopCategoriesResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

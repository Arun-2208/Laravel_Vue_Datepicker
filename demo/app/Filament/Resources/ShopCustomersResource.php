<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShopCustomersResource\Pages;
use App\Filament\Resources\ShopCustomersResource\RelationManagers;
use App\Models\shop_customers;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Tables\Filters\TrashedFilter;

class ShopCustomersResource extends Resource
{
    protected static ?string $model = shop_customers::class;

    protected static ?string $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                
                Section::make()
                    ->schema([
                        TextInput::make('name')
                            ->maxLength(255)
                            ->required(),

                        TextInput::make('email')
                            ->label('Email address')
                            ->required()
                            ->email()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),

                        TextInput::make('phone')
                            ->maxLength(255),

                        DatePicker::make('birthday')
                            ->maxDate('today'),
                    ])
                    ->columns(2)
                    ->columnSpan(['lg' => fn (?shop_customers $record) => $record === null ? 3 : 2]),

                Section::make()
                    ->schema([
                        Placeholder::make('created_at')
                            ->label('Created at')
                            ->content(fn (shop_customers $record): ?string => $record->created_at?->diffForHumans()),

                        Placeholder::make('updated_at')
                            ->label('Last modified at')
                            ->content(fn (shop_customers $record): ?string => $record->updated_at?->diffForHumans()),
                    ])
                    ->columnSpan(['lg' => 1])
                    ->hidden(fn (?shop_customers $record) => $record === null),
            ])
            ->columns(3);
            
    }

    public static function table(Table $table): Table
    {
        return $table
                ->columns([
                    TextColumn::make('name')
                        ->searchable(isIndividual: true)
                        ->sortable(),
                    TextColumn::make('email')
                        ->label('Email address')
                        ->searchable(isIndividual: true, isGlobal: false)
                        ->sortable(),
                    //TextColumn::make('country')
                        //->getStateUsing(fn ($record): ?string => Country::find($record->addresses->first()?->country)?->name ?? null),
                    TextColumn::make('phone')
                        ->searchable()
                        ->sortable(),
                ])
                ->filters([
                    TrashedFilter::make(),
                ])
                ->actions([
                    Tables\Actions\EditAction::make(),
                ])
                ->groupedBulkActions([
                    Tables\Actions\DeleteBulkAction::make()
                        ->action(function () {
                            Notification::make()
                                ->title('do not delete at once')
                                ->warning()
                                ->send();
                        }),
                    ])
            
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListShopCustomers::route('/'),
            'create' => Pages\CreateShopCustomers::route('/create'),
            'edit' => Pages\EditShopCustomers::route('/{record}/edit'),
        ];
    }
}

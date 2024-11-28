<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ShopCategoriesResource\Pages;
use App\Filament\Resources\ShopCategoriesResource\RelationManagers;

use App\Models\shop_categories;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;


use Filament\Forms\Components\TextInput;

use Filament\Forms\Components\MarkdownEditor;

use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Checkbox;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\CheckboxColumn;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Group;
use Filament\Infolists\Components\Grid;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Columns\TextColumn;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Illuminate\Support\Str;
use Filament\Tables\Columns\IconColumn;
use Filament\Infolists\Components\ImageEntry;

use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Stack;

class ShopCategoriesResource extends Resource
{
    protected static ?string $model = shop_categories::class;

    protected static ?string $navigationIcon = 'heroicon-o-tag';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?string $navigationLabel = 'Categories';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Section::make()
                ->schema([
                    
                            TextInput::make('name')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                            TextInput::make('slug')
                                ->disabled()
                                ->dehydrated()
                                ->required()
                                ->maxLength(255)
                                ->unique(shop_categories::class, 'slug', ignoreRecord: true),
                       
                    Select::make('parent_id')
                        ->label('Parent')
                        ->relationship('parent', 'name', fn (Builder $query) => $query->where('parent_id', null))
                        ->searchable()
                        ->placeholder('Select parent category'),

                    Toggle::make('is_visible')
                        ->label('Visible to customers.')
                        ->default(true),

                    MarkdownEditor::make('description')
                        ->label('Description'),
                ])
                ->columnSpan(['lg' => fn (?shop_categories $record) => $record === null ? 3 : 2]),
            Section::make()
                ->schema([
                    Placeholder::make('created_at')
                        ->label('Created at')
                        ->content(fn (shop_categories $record): ?string => $record->created_at?->diffForHumans()),

                    Placeholder::make('updated_at')
                        ->label('Last modified at')
                        ->content(fn (shop_categories $record): ?string => $record->updated_at?->diffForHumans()),
                ])
                ->columnSpan(['lg' => 1])
                ->hidden(fn (?shop_categories $record) => $record === null),
        ])
        ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
        ->columns([
            TextColumn::make('name')
                ->label('Name')
                ->searchable()
                ->sortable(),
            TextColumn::make('parent.name')
                ->label('Parent')
                ->searchable()
                ->sortable(),
            IconColumn::make('is_visible')
                ->label('Visibility')
                ->sortable(),
            TextColumn::make('updated_at')
                ->label('Updated Date')
                ->date()
                ->sortable(),
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
            'index' => Pages\ListShopCategories::route('/'),
            'create' => Pages\CreateShopCategories::route('/create'),
            'edit' => Pages\EditShopCategories::route('/{record}/edit'),
        ];
    }
}

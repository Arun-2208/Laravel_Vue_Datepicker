<?php

namespace App\Filament\Resources;


use App\Filament\Resources\BrandsResource\Pages;

use App\Filament\Resources\BrandsResource\RelationMangers;

use App\Models\brands;
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

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Infolists\Infolist;
use Illuminate\Support\Str;
use Filament\Infolists\Components\ImageEntry;

use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Stack;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class BrandsResource extends Resource
{
    protected static ?string $model = brands::class;

    protected static ?string $navigationIcon = 'heroicon-o-bookmark-square';

    protected static ?string $navigationGroup = 'Shop';

    protected static ?int $navigationSort = 2;

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
                                ->unique(brands::class, 'slug', ignoreRecord: true),
                    
                    TextInput::make('website')
                        ->required()
                        ->maxLength(255)
                        ,

                    Toggle::make('is_visible')
                        ->label('Visible to customers.')
                        ->default(true),

                    MarkdownEditor::make('description')
                        ->label('Description'),
                ])
                ->columnSpan(['lg' => fn (?brands $record) => $record === null ? 3 : 2]),
            Section::make()
                ->schema([
                    Placeholder::make('created_at')
                        ->label('Created at')
                        ->content(fn (brands $record): ?string => $record->created_at?->diffForHumans()),

                    Placeholder::make('updated_at')
                        ->label('Last modified at')
                        ->content(fn (brands $record): ?string => $record->updated_at?->diffForHumans()),
                ])
                ->columnSpan(['lg' => 1])
                ->hidden(fn (?brands $record) => $record === null),
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
                TextColumn::make('website')
                ->formatStateUsing(fn (string $state): string => str($state)->after('://')->ltrim('www.')->trim('/'))
                ->color('gray')
                ->limit(30),
                IconColumn::make('is_visible')->label('Visibility')->boolean()->trueIcon('heroicon-o-check-circle')
                ->falseIcon('heroicon-o-check-circle'),
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
            
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBrands::route('/'),
            'create' => Pages\CreateBrands::route('/create'),
            'edit' => Pages\EditBrands::route('/{record}/edit'),
        ];
    }
}

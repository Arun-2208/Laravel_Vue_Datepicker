<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LinkResource\Pages;
use App\Filament\Resources\LinkResource\RelationManagers;
use App\Models\link;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;

use Filament\Tables\Columns\Layout\Stack;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Support\Enums\FontWeight;

use Filament\Tables\Columns\Layout\Panel;
use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\ColorColumn;




class LinkResource extends Resource
{
    protected static ?string $model = link::class;

    protected static ?string $navigationIcon = 'heroicon-o-link';

    protected static ?string $navigationGroup = 'Blog';
    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                ->maxLength(255)
                ->required(),
            ColorPicker::make('color')
                ->required()
                ->hex()
                ->hexColor(),
            Textarea::make('description')
                ->maxLength(1024)
                ->required()
                ->columnSpanFull(),
            TextInput::make('url')
                ->label('URL')
                ->required()
                ->maxLength(255)
                ->columnSpanFull(),
            FileUpload::make('image')
                ->image(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Stack::make([
                    ImageColumn::make('image')
                        ->height('100%')
                        ->width('100%'),
                    Stack::make([
                        TextColumn::make('title')
                            ->weight(FontWeight::Bold),
                        TextColumn::make('url')
                            ->formatStateUsing(fn (string $state): string => str($state)->after('://')->ltrim('www.')->trim('/'))
                            ->color('gray')
                            ->limit(30),
                    ]),
                ])->space(3),
                Panel::make([
                    Split::make([
                        ColorColumn::make('color')
                            ->grow(false),
                        TextColumn::make('description')
                            ->color('gray'),
                    ]),
                ])->collapsible(),
            ])    
            
            ->filters([
                //
            ])
            ->contentGrid([
                'md' => 2,
                'xl' => 3,
            ])
            ->paginated([
                18,
                36,
                72,
                'all',
            ])
            


            ->actions([

                Tables\Actions\Action::make('visit')
                ->label('Visit Link')
                ->icon('heroicon-m-arrow-top-right-on-square')
                ->color('gray')
                ->url(fn(link $record):string => ($record->url))
                ->openUrlInNewTab(),
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
            'index' => Pages\ListLinks::route('/'),
            'create' => Pages\CreateLink::route('/create'),
            'edit' => Pages\EditLink::route('/{record}/edit'),
        ];
    }
}

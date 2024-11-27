<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Filament\Resources\CustomerResource\RelationManagers;
use App\Models\customer;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Stack;
use Filament\Notifications\Notification;


class CustomerResource extends Resource
{
    protected static ?string $model = customer::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'Blog';
    protected static ?string $navigationLabel = 'Authors';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form           
            ->schema([
                TextInput::make('name')->required(),                              
                TextInput::make('email')->email(),                                
                MarkdownEditor::make('bio')->required(),
                TextInput::make('github')->label('Git Hub Handle')->required(),
                TextInput::make('twitter')->label('Twitter Handle')->required()
            ],)->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Split::make([
                    Stack::make([
                        TextColumn::make('name')
                        ->searchable()
                        ->sortable()
                        ->weight('medium')
                        ->alignLeft(),

                        TextColumn::make('email')
                        ->label('Email address')
                            ->searchable()
                            ->sortable()
                            ->color('gray')
                            ->alignLeft(),
                
            ])->space(),

                    Stack::make([
                        TextColumn::make('github')
                            ->icon('heroicon-o-envelope')
                            ->label('GitHub')
                            ->alignLeft(),

                        TextColumn::make('twitter')
                            ->icon('heroicon-o-envelope')
                            ->label('Twitter')
                            ->alignLeft(),

                    ])->space(2)
            
            ])->from('md') 

            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()
            ])
            ->groupedBulkActions([
                Tables\Actions\DeleteBulkAction::make()
                    ->action(function () {
                        Notification::make()
                            ->title('Please be careful , this could be dangerous !')
                            ->warning()
                            ->send();
                    }),
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
            'index' => Pages\ListCustomers::route('/'),
            'create' => Pages\CreateCustomer::route('/create'),
            'edit' => Pages\EditCustomer::route('/{record}/edit'),
        ];
    }
}

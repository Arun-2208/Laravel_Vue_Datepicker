<?php


namespace App\Filament\Resources;

use App\Filament\Resources\ProductsResource\Pages;

use App\Filament\Resources\ProductsResource\RelationMangers;

use App\Models\products;
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
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Forms\Components\FileUpload;
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

use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\BooleanConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\RelationshipConstraint\Operators\IsRelatedToOperator;
use Filament\Tables\Filters\QueryBuilder\Constraints\SelectConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\TextConstraint;


class ProductsResource extends Resource
{
    protected static ?string $model = products::class;

    protected static ?string $navigationIcon = 'heroicon-o-bolt';

    protected static ?string $navigationGroup = 'Shop';
    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Group::make()
                ->schema([
                    Section::make()
                        ->schema([
                            TextInput::make('name')
                                ->required()
                                ->maxLength(255)
                                ->live(onBlur: true)
                                ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                    if ($operation !== 'create') {
                                        return;
                                    }

                                    $set('slug', Str::slug($state));
                                }),

                            TextInput::make('slug')
                                ->disabled()
                                ->dehydrated()
                                ->required()
                                ->maxLength(255)
                                ->unique(products::class, 'slug', ignoreRecord: true),

                            MarkdownEditor::make('description')
                                ->columnSpan('full'),
                        ])
                        ->columns(2),

                    Section::make('Images')
                        ->schema([
                            FileUpload::make('media')
                                
                                ->multiple()
                                ->maxFiles(5)
                                ->hiddenLabel(),
                        ])
                        ->collapsible(),

                    Section::make('Pricing')
                        ->schema([
                            TextInput::make('price')
                                ->numeric()
                                ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                                ->required(),

                            TextInput::make('old_price')
                                ->label('Compare at price')
                                ->numeric()
                                ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                                ->required(),

                            TextInput::make('cost')
                                ->label('Cost per item')
                                ->helperText('Customers won\'t see this price.')
                                ->numeric()
                                ->rules(['regex:/^\d{1,6}(\.\d{0,2})?$/'])
                                ->required(),
                        ])
                        ->columns(2),
                    Section::make('Inventory')
                        ->schema([
                            TextInput::make('sku')
                                ->label('SKU (Stock Keeping Unit)')
                                ->unique(products::class, 'sku', ignoreRecord: true)
                                ->maxLength(255)
                                ->required(),

                            TextInput::make('barcode')
                                ->label('Barcode (ISBN, UPC, GTIN, etc.)')
                                ->unique(products::class, 'barcode', ignoreRecord: true)
                                ->maxLength(255)
                                ->required(),

                            TextInput::make('qty')
                                ->label('Quantity')
                                ->numeric()
                                ->rules(['integer', 'min:0'])
                                ->required(),

                            TextInput::make('security_stock')
                                ->helperText('The safety stock is the limit stock for your products which alerts you if the product stock will soon be out of stock.')
                                ->numeric()
                                ->rules(['integer', 'min:0'])
                                ->required(),
                        ])
                        ->columns(2),

                    Section::make('Shipping')
                        ->schema([
                            Checkbox::make('backorder')
                                ->label('This product can be returned'),

                            Checkbox::make('requires_shipping')
                                ->label('This product will be shipped'),
                        ])
                        ->columns(2),
                ])
                ->columnSpan(['lg' => 2]),

            Group::make()
                ->schema([
                    Section::make('Status')
                        ->schema([
                            Toggle::make('is_visible')
                                ->label('Visible')
                                ->helperText('This product will be hidden from all sales channels.')
                                ->default(true),

                            DatePicker::make('published_at')
                                ->label('Availability')
                                ->default(now())
                                ->required(),
                        ]),

                    Section::make('Associations')
                        ->schema([
                            Select::make('brand_id')
                                ->relationship('brand', 'name')
                                ->searchable()
                                ->hiddenOn(ProductsRelationManager::class),

                            Select::make('Categories')
                                ->relationship('categories', 'name')
                                ->multiple()
                                ->required(),
                        ]),
                ])
                ->columnSpan(['lg' => 1]),
        ])
        ->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->label('Image'),
                    

                TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('brand.name')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                IconColumn::make('is_visible')
                    ->label('Visibility')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('price')
                    ->label('Price')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('sku')
                    ->label('SKU')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('qty')
                    ->label('Quantity')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('security_stock')
                    ->searchable()
                    ->sortable()
                    ->toggleable()
                    ->toggledHiddenByDefault(),

                TextColumn::make('published_at')
                    ->label('Publish Date')
                    ->date()
                    ->sortable()
                    ->toggleable()
                    ->toggledHiddenByDefault(),
            ])
            ->filters([
                QueryBuilder::make()
                    ->constraints([
                        TextConstraint::make('name'),
                        TextConstraint::make('slug'),
                        TextConstraint::make('sku')
                            ->label('SKU (Stock Keeping Unit)'),
                        TextConstraint::make('barcode')
                            ->label('Barcode (ISBN, UPC, GTIN, etc.)'),
                        TextConstraint::make('description'),
                        NumberConstraint::make('old_price')
                            ->label('Compare at price')
                            ->icon('heroicon-m-currency-dollar'),
                        NumberConstraint::make('price')
                            ->icon('heroicon-m-currency-dollar'),
                        NumberConstraint::make('cost')
                            ->label('Cost per item')
                            ->icon('heroicon-m-currency-dollar'),
                        NumberConstraint::make('qty')
                            ->label('Quantity'),
                        NumberConstraint::make('security_stock'),
                        BooleanConstraint::make('is_visible')
                            ->label('Visibility'),
                        BooleanConstraint::make('featured'),
                        BooleanConstraint::make('backorder'),
                        BooleanConstraint::make('requires_shipping')
                            ->icon('heroicon-m-truck'),
                        DateConstraint::make('published_at'),
                    ])
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProducts::route('/create'),
            'edit' => Pages\EditProducts::route('/{record}/edit'),
        ];
    }
}

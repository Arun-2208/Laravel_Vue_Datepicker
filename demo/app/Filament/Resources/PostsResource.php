<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostsResource\Pages;
use App\Filament\Resources\PostsResource\RelationManagers;
use App\Models\posts;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Checkbox;
use Filament\Forms\Components\Select;
use App\Models\categories;
use Filament\Forms\Components\FileUpload;
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

class PostsResource extends Resource
{
    protected static ?string $model = Posts::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationGroup = 'Blog';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
               
                Group::make()->schema([
                    Section::make('General Info')->schema([
                        TextInput::make('title')->required(),
                        TextInput::make('slug')->required(),
                        ]),
                    MarkdownEditor::make('content')->required(),
                
                ]),

                Group::make()->schema([
                    Section::make('File Upload')->schema([
                        FileUpload::make('thumbnail')->disk('public')->directory('thumbnails')])->columnSpan(2),
                    Section::make()->schema([
                        ColorPicker::make('color')->required(),
                        Select::make('category_id')
                            ->label('Category')
                            ->options(categories::all()->pluck('name','id'))])->columnSpan(2),

                            section::make('Meta tags and Publish status')->schema([
                                TagsInput::make('tags')->required(),
                                Checkbox::make('published')])        
                           ])
                
                ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('thumbnail')->label('Image')->toggleable(),
                TextColumn::make('title')->sortable()->searchable()->toggleable(),
                TextColumn::make('color')->label('Author')->toggleable()->sortable(),
                TextColumn::make('slug')->label('Status')->searchable()->toggleable()->badge()
                ->getStateUsing(fn (posts $record): string => $record->published_at?->isPast() ? 'Published' : 'Draft')
                ->colors([
                    'success' => 'Published',
                ]),
                TextColumn::make('created_at')->label('Published Date')->date()->toggleable(),
                TextColumn::make('tags')->label('Comment Authors')->searchable()->toggleable()
                ->listWithLineBreaks()
                ->limitList(1)
                ->expandableLimitedList(),
                
                TextColumn::make('category_id')->sortable()->searchable()->toggleable(),
                ImageColumn::make('thumbnail')->label('Image')->toggleable(),
                
                CheckboxColumn::make('published')->toggleable()

            ])
            ->filters([
                
                Filter::make('created_at')
    ->form([
        DatePicker::make('created_from'),
        DatePicker::make('created_until'),
    ])
    ->query(function (Builder $query, array $data): Builder {
        return $query
            ->when(
                $data['created_from'],
                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
            )
            ->when(
                $data['created_until'],
                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
            );
    })
                
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
/*
    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
               
                        Split::make([
                            Grid::make(2)
                                ->schema([
                                    Group::make([
                                        TextEntry::make('title'),
                                        TextEntry::make('slug'),
                                        TextEntry::make('published_at')
                                            ->badge()
                                            ->date()
                                            ->color('success'),
                                    ]),
                                    Group::make([
                                        TextEntry::make('content'),
                                        TextEntry::make('category_id'),
                                        TextEntry::make('tags'),
                                    ]),
                                ]),
                            ImageEntry::make('image')
                                ->hiddenLabel()
                                ->grow(false)
                        ])->from('lg'),
                            
               
                        TextEntry::make('content')
                            ->prose()
                            ->markdown()
                            ->hiddenLabel()
                   
                ]);
        
    }
/*/
    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePosts::route('/create'),
            'edit' => Pages\EditPosts::route('/{record}/edit'),
        ];
    }
}

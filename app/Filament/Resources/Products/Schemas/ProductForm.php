<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required()
                    ->live(onBlur: true) // supaya jalan pas selesai ngetik
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('slug', \Illuminate\Support\Str::slug($state));
                    }),
                TextInput::make('slug')
                    ->required()
                    ->disabled() // biar user tidak bisa ubah manual
                    ->dehydrated(true),
                Textarea::make('description')
                    ->default(null)
                    ->columnSpanFull(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp'),
                TextInput::make('stock')
                    ->required()
                    ->numeric()
                    ->default(0),
                Select::make('category_id')
                    ->label('Categorie')
                    ->relationship('categories', 'id')
                    ->required(),
                Select::make('brand_id')
                    ->label('brand')
                    ->relationship('brand', 'id')
                    ->required(),
                FileUpload::make('image')
                    ->image(),
            ]);
    }
}

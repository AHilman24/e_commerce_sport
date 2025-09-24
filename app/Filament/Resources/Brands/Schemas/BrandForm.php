<?php

namespace App\Filament\Resources\Brands\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class BrandForm
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
                FileUpload::make('logo')
                    ->directory('img-brands')
                    ->image()
                    ->avatar()
            ]);
    }
}

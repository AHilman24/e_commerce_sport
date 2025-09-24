<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('name'),
                TextEntry::make('slug'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('price')
                    ->money('Rp. '),
                TextEntry::make('stock')
                    ->numeric(),
                TextEntry::make('categories.name')
                    ->label('Categorie'),
                TextEntry::make('brand.name')
                    ->label('Brand'),
                ImageEntry::make('image')
                    ->placeholder('-'),
            ]);
    }
}

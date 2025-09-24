<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use \App\Models\Brand;
use \App\Models\Categorie;

class Product extends Model
{
    protected $guarded = [];

    public function brand(){
        return $this->belongsTo(Brand::class, 'brand_id');
    }
    public function categories(){
        return $this->belongsTo(Categorie::class, 'category_id');
    }
}

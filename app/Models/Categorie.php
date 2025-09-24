<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    protected $guarded = [];

    public function Products(){
        return $this->hasMany(App\Models\Product::class,'category_id');
    }
}

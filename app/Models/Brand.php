<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $guarded = [];

    public function Products(){
        return $this->hasMany(\App\Models\Product::class, 'brand_id');
    }
}

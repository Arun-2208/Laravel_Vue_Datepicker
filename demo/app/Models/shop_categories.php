<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\shop_categories;


class shop_categories extends Model
{
    
    protected $fillable = ['name' , 'slug' , 'parent_id'.'description'];

    public function categories(){
        return $this->belongsTo(shop_categories::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\categories;

class posts extends Model
{

    use HasFactory;

    protected $fillable =[
                            'slug',
                            'thumbnail',
                            'content',
                            'color',
                            'category_id',
                            'tags',
                            'published',
                            'title',

];

    protected $casts =[
        'tags' => 'array',
    ];

    public function categories(){
        return $this->belongsTo(categories::class);
    }
}



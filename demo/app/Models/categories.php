<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;


class categories extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;

   
    protected $table = 'categories';

    
    protected $casts = [
        'is_visible' => 'boolean',
    ];

    
}
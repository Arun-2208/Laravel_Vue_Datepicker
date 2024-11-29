<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\shop_categories;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class shop_categories extends Model
{
    protected $fillable = ['name' , 'slug' , 'parent_id','description','is_visible'];

    public function categories(){
        return $this->belongsTo(shop_categories::class);
    }

    /**
     * @var string
     */
    protected $table = 'shop_categories';

    /**
     * @var array<string, string>
     */
    protected $casts = [
        'is_visible' => 'boolean',
    ];

    /** @return HasMany<shop_categories> */
    public function children(): HasMany
    {
        return $this->hasMany(shop_categories::class, 'parent_id');
    }

    /** @return BelongsTo<shop_categories,self> */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(shop_categories::class, 'parent_id');
    }

    /** @return BelongsToMany<products> */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(products::class, 'shop_categories_products', 'category_id', 'product_id')->withTimestamps();
    }

}


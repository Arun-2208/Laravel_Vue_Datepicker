<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models;

class brands extends Model
{

    use HasFactory;

    protected $fillable =['name','slug','is_visible'];

};

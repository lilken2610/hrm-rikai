<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\DepartmentEmployee;

class Position extends Model
{
    use HasFactory;
    protected $guarded = [];

    // public function department_employees()
    // {
    //     return $this->hasMany(DepartmentEmployee::class,'position_id');
    // }
}

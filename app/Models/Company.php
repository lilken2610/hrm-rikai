<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Holiday, Employee};
use App\Models\Role;

class Company extends Model
{
    use HasFactory;
    // protected $fillable = [
    //     'id', 'name', 'description','create_by','update_by','deleted_at'
    // ];
   
   	public function holidays(){
   		return $this->hasMany(Holiday::class);
   	}

   	public function employees(){
   		return $this->hasMany(Employee::class);
   	}

    protected $guarded = array();

    public function role()
    {
        return $this->hasMany(Role::class);
    }
    public function user_create()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function user_update()
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }
}

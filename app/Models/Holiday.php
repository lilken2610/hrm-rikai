<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Employees, Company, EmployeeHoliday};
use Illuminate\Database\Eloquent\SoftDeletes;
 
class Holiday extends Model
{
    use HasFactory;
    use SoftDeletes;

   
    protected $dates = ['deleted_at'];

    protected $table = 'holidays';
    public $timestamps = true;

    protected $fillable = [
       'id','type','days','status','description','start_time','end_time','company_id','created_by','updated_by','deleted_at','created_at','updated_at'
    ];
   
   	public function employee_holidays(){
    	return $this->hasMany(EmployeeHoliday::class);
    }

    public function company(){
    	return $this->belongsTo(Company::class);
    }
}

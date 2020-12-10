<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Holiday, Company, EmployeeHoliday,Employee};

class Employee extends Model
{
    use HasFactory;
    protected $table='employees';
    protected $fillable = [
       'id','name','email','phone','gender','address','company_id','create_by','update_by','deleted_at','created_at','updated_at'
    ];

    public function employee_holidays(){
    	return $this->hasMany(EmployeeHoliday::class);
    }

   	public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class,'department_employees')->withPivot('position_id');
    }
    public function working_times()
    {
        return $this->hasMany(Working::class);
    }
    public function department_employees(){
        return $this->hasMany(DepartmentEmployee::class);
    }
}

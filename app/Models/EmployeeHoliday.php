<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\{Employee, Holiday};

class EmployeeHoliday extends Model
{
    use HasFactory;
    protected $table='employee_holidays';
    protected $fillable = [
        'id', 
        'employee_id', 
        'holiday_id',
        'days',
        'manager_id',
        'status',
        'note',
        'start_time',
        'end_time',
        'created_by',
        'updated_by',
        'deleted_at',
        'created_at',
        'updated_at'
    ];
    
    function employee(){
    	return $this->belongsTo(Employee::class);
    }

    function holiday(){
    	return $this->belongsTo(Holiday::class);
    }
}

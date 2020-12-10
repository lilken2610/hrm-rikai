<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;
use App\Models\Employee;

class Working extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $table = "working_times";

    protected $fillable = [
        'employee_id',
        'type',
        'time',
        'created_by',
        'updated_by'
    ];
    protected $hidden = [
        'deteled_at'
    ];
    public function employee()
    {
        return $this->belongsTo(Employee::class,'employee_id');
    }
}

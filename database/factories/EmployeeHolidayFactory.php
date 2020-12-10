<?php

namespace Database\Factories;

use App\Models\{Employee, EmployeeHoliday};
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class EmployeeHolidayFactory extends Factory
{
    private $employee;
    private $holiday;

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = EmployeeHoliday::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $this->employee = Employee::all()->random();
       
        $this->holiday = $this->employee->company->holidays()->get()->random();
        $id = $this->holiday->id;
        return [
            'employee_id' => $this->employee->id,
            'holiday_id' => $id,
            'days' => 3,
            'manager_id' => $this->employee->random()->id,
            'status' => '',
            'note' => '',
            'start_time' => Carbon::now(),
            'end_time' => Carbon::now()->add(1, 'day'),
            'created_by' => 0,
            'updated_by' => 0,
        ];
    }
}

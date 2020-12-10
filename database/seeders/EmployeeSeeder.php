<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{Employee, Department,DepartmentEmployee, Position};
use Carbon\Carbon;

class EmployeeSeeder extends Seeder
{
    private $departments;
    private $positions;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->departments = Department::all();
        $this->positions = Position::all();
        Employee::factory()->count(500)->create()->each(function ($employee) {
            $employee->department_employees()->create([
                'department_id' => $this->departments->random()->id,
                'position_id' => $this->positions->random()->id,
                'from_date' => Carbon::today(),
                'to_date' => Carbon::today(),
                'created_by'=>Carbon::today() , 
                'updated_by'=>Carbon::today()
            ]);
        });
    }

}

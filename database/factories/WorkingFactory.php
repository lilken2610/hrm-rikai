<?php

namespace Database\Factories;

use App\Models\Working;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Working::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $employee = Employee::all();
        return [
            'employee_id' => $employee->random(),
            'time' => $this->faker->dateTime($max = 'now', $timezone = null),
            'type' => $this->faker->randomElement($array = array(1,2)),
            'created_by' => $this->faker->randomElement($array = array (1,2)),
            'updated_by' => $this->faker->randomElement($array = array (1,2)),
        ];
    }
}

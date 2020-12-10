<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DepartmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Department::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->randomElement($array = array('Sales','Dev')),
            'description'=>$this->faker->text,
            'created_by'=>$this->faker-> date($format = 'Y-m-d', $max = 'now'),
            'updated_by'=>$this->faker-> date($format = 'Y-m-d', $max = 'now'),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'image' => $this->faker->imageUrl($width = 640, $height = 480),
            'email' => $this->faker->freeEmail,
            'phone' => $this->faker->e164PhoneNumber,
            'gender' => $this->faker->randomElement($array = array(0, 1)),
            'address' => $this->faker->address,
            'identification_card' => $this->faker->ean8,
            'day_of_birth' =>$this->faker->date($format = 'Y-m-d', $max = '2000-01-01'),
            'company_id' => 1,
            'created_by' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
            'updated_by' => $this->faker->date($format = 'Y-m-d', $max = 'now')
        ];
    }
}

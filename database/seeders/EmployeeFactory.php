<?php

namespace Database\Factories;

use App\Models\{Employee, Company};
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class EmployeeFactory extends Factory
{
    private $companies;
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
        $this->companies = Company::all();

        return [
            'name'=> 'hien',
            'email'=> $this->faker->email,
            'phone'=> '0123456789',
            'gender'=> 1,
            'address'=> 'Dak Lak',
            'created_by'=> 0,
            'updated_by'=> 0,
            'company_id' => $this->companies->random()->id,
        ];
    }
}

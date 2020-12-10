<?php

namespace Database\Factories;

use App\Models\Model;
use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class RoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Role::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $roles = ['Admin', 'Manager', 'Directer', 'Developer', 'Tester'];
        return [
            'name' =>    Arr::random($roles),
            'description' => $this->faker->text,
            'company_id' => 1,
            'created_by' => 1,
            'updated_by' => 1,
        ];
    }
}
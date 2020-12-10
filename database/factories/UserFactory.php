<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'email' => $this->faker->freeEmail,
            'fullname' => $this->faker->name,
            'password' => $this->faker->password(),
            'remember_token' => Str::random(20),
            'employee_id' => 0,
            'created_by' => 0,
            'updated_by' => 0,
        ];
    }
}
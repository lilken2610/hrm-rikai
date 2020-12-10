<?php

namespace Database\Factories;

use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PositionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Position::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->randomElement($array = array ('CEO','Manager','Developer','Tech Lead','PM','HR','QA','Tester'))  ,
            'description'=>$this->faker->realText($maxNbChars = 200, $indexSize = 2), 
            'created_by'=>$this->faker-> date($format = 'Y-m-d', $max = 'now') , 
            'updated_by'=>$this->faker->date($format = 'Y-m-d', $max = 'now')
        ];
    }
}

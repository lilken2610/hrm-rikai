<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\{Holiday, Company};

class HolidayFactory extends Factory
{
    private $companies;
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Holiday::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $this->companies = Company::all();
        return [
            'type'=>'Nghi khong luong',
            'days'=>6,
            'status'=>'da duyet',
            'description'=>'sgd',
            'start_time'=>date('Y-m-d H:i:s'),
            'end_time'=>date('Y-m-d H:i:s'),
            'created_by' => 0,
            'updated_by' => 0,
            'company_id' => $this->companies->random()->id,
        ];
    }
}

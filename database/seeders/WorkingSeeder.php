<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Working;

class WorkingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Working::factory()->times(1000)->create();
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Database\Factories\CompanyFactory;
use App\Models\Company;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call([
        //     RoleSeeder::class,
        //     UserSeeder::class,
        //     CompanyDatabaseSeeder::class,
        // ]);
        Company::factory()->count(50)->create();
    
         $this->call([
         CompanySeeder::class,
         EmployeeSeeder::class,
         EmployeeHolidaySeeder::class,
         HolidaySeeder::class
    ]);
     }
}

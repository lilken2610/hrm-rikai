<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Employee;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Department::insert([
            [
             'name' => 'Sale',
             'description'=>'QA', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'Developer',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ]
        ]);
    }
}

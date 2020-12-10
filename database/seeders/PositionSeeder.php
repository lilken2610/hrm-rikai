<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Position;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Position::insert([
            [
             'name' => 'Manager',
             'description'=>'QA', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'Tech Lead',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'PM',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'HR',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'Tester',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ],
            [
             'name' => 'Dev',
             'description'=>'abcd', 
             'created_by'=>'2000-01-01' , 
             'updated_by'=>'2000-01-01'
            ]
            ]);
         
        
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{User, Role};

class UserSeeder extends Seeder
{
    private $roles;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->roles = Role::get();
        User::factory()->count(10)->create()->each(function ($user) {
            $user->roles()->attach($this->roles->id->random());
        });
    }
}
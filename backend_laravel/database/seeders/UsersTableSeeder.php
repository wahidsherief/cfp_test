<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Define sample user data
        $users = [
            [
                'first_name' => 'John',
                'last_name' => 'Doe',
                'email' => 'john@example.com',
                'mobile' => '1234567890',
                'date_of_birth' => '1990-01-01',
                'username' => 'johndoe',
                'password' => Hash::make('password'),
                'nid' => '1234567890123', // Sample NID
                'email_verified_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Add more sample users as needed
        ];

        // Insert sample data into the users table
        DB::table('users')->insert($users);
    }
}

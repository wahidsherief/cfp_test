<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_returns_all_users_as_json()
    {

        User::factory()->count(3)->create();

        $response = (new \App\Http\Controllers\UserController())->index();

        $users = json_decode($response->getContent(), true);
        $this->assertCount(3, $users);
    }

    /** @test */
    public function it_creates_a_new_user_and_returns_it_as_json()
    {
        // Create user data with a hashed password
        $userData = [
            'first_name' => 'Cade',
            'last_name' => 'Heaney',
            'email' => 'dblock@example.com',
            'email_verified_at' => now(),
            'mobile' => '1-323-468-5497',
            'date_of_birth' => '1996-07-22',
            'username' => 'lmohr',
            'nid' => '1c4fd4d5-7cc1-3fb5-a568-2a45aea65f4f',
            'password' => Hash::make('password'), // Hash the password
        ];

        // Mock the request object
        $request = $this->mock(StoreUserRequest::class);
        $request->shouldReceive('validated')->andReturn($userData);

        // Create a new instance of UserController
        $userController = new UserController();

        // Call the store method with the request
        $response = $userController->store($request);

        // Extract the user from the JSON response
        $user = $response->getOriginalContent();

        // Assert that the returned value is an instance of User
        $this->assertInstanceOf(User::class, $user);
    }

    /** @test */
    public function it_deletes_a_user_and_returns_success_message()
    {
        // Create a user to delete
        $user = User::factory()->create();

        // Create an instance of UserController
        $userController = new UserController();

        // Call the destroy method with the user ID
        $response = $userController->destroy($user->id);

        // Assert that the user is deleted
        $this->assertDatabaseMissing('users', ['id' => $user->id]);

        // Assert that the response contains the expected JSON message
        $this->assertEquals('User deleted successfully', $response->getData()->message);

        // Assert that the response status code is 200 (OK)
        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());
    }
}

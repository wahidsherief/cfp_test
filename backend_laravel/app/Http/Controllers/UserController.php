<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    //  early returns (guard clauses)
    private function findUserOrFail($id)
    {
        $user = User::find($id);
        if (!$user) {
            abort(404, 'User not found');
        }
        return $user;
    }

    public function index()
    {
        return response()->json($this->getCachedUsers());
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        $this->clearUserCache();
        return response()->json($user, Response::HTTP_CREATED);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = $this->findUserOrFail($id);
        $user->update($request->validated());
        $this->clearUserCache();
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = $this->findUserOrFail($id);
        $user->delete();
        $this->clearUserCache();
        return response()->json(['message' => 'User deleted successfully']);
    }

    // get all users
    private function getCachedUsers()
    {
        $cacheDuration = 3600;
        return Cache::remember('users.all', $cacheDuration, function () {
            return User::all();
        });
    }

    // clear user cache
    private function clearUserCache()
    {
        Cache::forget('users.all');
    }
}

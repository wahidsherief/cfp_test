<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $id = $this->route('user'); // Assuming your route parameter for user ID is named 'user'

        return [
            'first_name' => '',
            'last_name' => '',
            'email' => 'email|unique:users,email,' . $id,
            'mobile' => '',
            'date_of_birth' => 'date',
            'username' => 'unique:users,username,' . $id,
            'password' => '',
            'nid' => 'unique:users,nid,' . $id,
        ];
    }
}

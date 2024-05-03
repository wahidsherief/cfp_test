<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users',
            'mobile' => 'required',
            'date_of_birth' => 'required|date',
            'username' => 'required|unique:users',
            'password' => 'required',
            'nid' => 'required|unique:users',
        ];
    }
}

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
            'first_name' => 'required|regex:/^[a-zA-Z]+$/',
            'last_name' => 'required|regex:/^[a-zA-Z]+$/',
            'email' => 'required|email|unique:users',
            'mobile' => 'required|digits_between:10,11',
            'date_of_birth' => 'required|date',
            'username' => 'required|max:6|unique:users',
            'password' => 'required|min:3',
            'nid' => 'required|digits:5|unique:users',
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'The first name field is required.',
            'first_name.regex' => 'The first name field must contain only alphabetic characters.',

            'last_name.required' => 'The last name field is required.',
            'last_name.regex' => 'The last name field must contain only alphabetic characters.',

            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',

            'mobile.required' => 'The mobile field is required.',
            'mobile.digits_between' => 'The mobile must be between :min and :max digits.',

            'date_of_birth.required' => 'The date of birth field is required.',
            'date_of_birth.date' => 'The date of birth must be a valid date.',

            'username.required' => 'The username field is required.',
            'username.max' => 'The username may not be greater than :max characters.',
            'username.unique' => 'The username has already been taken.',

            'password.required' => 'The password field is required.',
            'password.min' => 'The password must be at least :min characters.',

            'nid.required' => 'The nid field is required.',
            'nid.digits' => 'The nid must be :digits digits long.',
            'nid.unique' => 'The nid has already been taken.',
        ];
    }
}

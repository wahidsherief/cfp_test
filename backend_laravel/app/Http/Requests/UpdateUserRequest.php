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
        $id = $this->route('user');

        return [
            'first_name' => 'regex:/^[^0-9]+$/',
            'last_name' => 'regex:/^[^0-9]+$/',
            'email' => 'email|unique:users,email,' . $id,
            'mobile' => 'digits_between:10,11',
            'date_of_birth' => 'date',
            'username' => 'max:6|unique:users,username,' . $id,
            'password' => 'min:3',
            'nid' => 'digits:5|unique:users,nid,' . $id
        ];
    }

    public function messages()
    {
        return [
            'first_name.regex' => 'The first name field must not contain any numbers.',
            'last_name.regex' => 'The last name field must not contain any numbers.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'mobile.digits_between' => 'The mobile must be between :min and :max digits.',
            'date_of_birth.date' => 'The date of birth must be a valid date.',
            'username.max' => 'The username may not be greater than :max characters.',
            'username.unique' => 'The username has already been taken.',
            'password.min' => 'The password must be at least :min characters.',
            'nid.digits' => 'The nid must be :digits digits long.',
            'nid.unique' => 'The nid has already been taken.',
        ];
    }

}

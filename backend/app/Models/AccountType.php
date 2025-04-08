<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authentication;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AccountType extends Authentication
{
    protected $table = 'ACCOUNT_TYPE';
    protected $fillable = ['type_id', 'type_name'];
}

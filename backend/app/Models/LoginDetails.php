<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LoginDetails extends Model
{
    protected $table = 'LOGIN_DETAILS';
    protected $primaryKey = 'login_id';
    protected $fillable = ['email', 'Password'];
    public $timestamps = false;

    public function account(): HasOne
    {
        return $this->hasOne(Account::class, 'login_id', 'login_id');
    }
}
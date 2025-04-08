<?php

namespace App\Models;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class LoginDetails extends Model implements AuthenticatableContract
{
    protected $table = 'LOGIN_DETAILS';
    protected $primaryKey = 'login_id';
    protected $authPasswordName = 'password';
    protected $rememberTokenName = 'remember_token';
    protected $fillable = ['email', 'password'];
    protected $hidden = ['password', 'remember_token'];
    public $timestamps = false;

    public function account(): HasOne
    {
        return $this->hasOne(Account::class, 'login_id', 'login_id');
    }

    public function register(): HasOne
    {
        return $this->hasOne(Register::class, 'login_id', 'login_id');
    }
    public function getAuthIdentifierName()
    {
        return $this->primaryKey;
    }public function getAuthIdentifier()
    {
        return $this->{$this->getAuthIdentifierName()};
    }
    public function getAuthPasswordName()
    {
        return $this->authPasswordName;
    }
    public function getAuthPassword()
    {
        return $this->{$this->getAuthPasswordName()};
    }
    public function getRememberToken()
    {
        if (! empty($this->getRememberTokenName())) {
            return (string) $this->{$this->getRememberTokenName()};
        }
    }
    public function setRememberToken($value)
    {
        if (! empty($this->getRememberTokenName())) {
            $this->{$this->getRememberTokenName()} = $value;
        }
    }
    public function getRememberTokenName()
    {
        return $this->rememberTokenName;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    protected $table = 'ACCOUNTS';
    protected $primaryKey = 'account_id';
    protected $fillable = ['type_id', 'register_id', 'login_id'];
    public $timestamps = false;

    public function register(): BelongsTo
    {
        return $this->belongsTo(Register::class, 'register_id', 'register_id');
    }

    public function loginDetails(): BelongsTo
    {
        return $this->belongsTo(LoginDetails::class, 'login_id', 'login_id');
    }
}
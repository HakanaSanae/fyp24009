<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\Relations\HasOne;

class Register extends Model
{
    protected $table = 'REGISTER';
    protected $primaryKey = 'register_id'; 
    protected $fillable = ['name', 'date', 'login_id'];
    public $timestamps = false;

    public function account(): HasOne
    {
        return $this->hasOne(Account::class, 'register_id', 'register_id');
    }
}
<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'last_login_at',
        'is_online',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'last_login_at' => 'datetime',
            'is_online' => 'boolean',
        ];
    }

    // ログイン状態を更新(最終ログインが今、オンライン状態へ更新)
    public function updateLoginStatus()
    {
        $this->update([
            'last_login_at' => now(),
            'is_online' => true,
        ]);
    }

    // ログアウト状態を更新(オンラインからオフラインへ更新)
    public function updateLogoutStatus()
    {
        $this->update([
            'is_online' => false,
        ]);
    }

    // オンラインかどうか判定（最終ログインから30分以内）
    public function isOnline()
    {
        return $this->is_online &&
            $this->last_login_at &&
            $this->last_login_at->diffInMinutes(now()) <= 30;
    }

    // 名前を部分一致検索
    public function scopeSearch(Builder $query, $search)
    {
        return $query->where('name', 'like', '%' . $search . '%');
    }

    // 一覧表示のページ数
    const PER_PAGE = 10;
}

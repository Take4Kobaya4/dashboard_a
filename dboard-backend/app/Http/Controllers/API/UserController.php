<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $query = $search ? User::search($search) : User::query();

        $users = $query->orderBy('created_at', 'desc')->paginate(User::PER_PAGE);

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed'
        ], [
            'name.required' => '名前は必須です。',
            'email.required' => 'メールアドレスは必須です。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'password.required' => 'パスワードは必須です。',
            'password.confirmed' => 'パスワード確認が一致しません。',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        // ユーザーが見つからない場合は、404エラーを返す
        if(!$user) {
            return response()->json([
                'message' => 'User not found',
                'success' => false,
            ], 404);
        }

        return response()->json([
            'user' => $user,
            'success' => true,
            'message' => 'User fetched successfully',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        // ユーザーが見つからない場合は、404エラーを返す
        if(!$user) {
            return response()->json([
                'message' => 'User not found',
                'success' => false,
            ], 404);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => ['required', 'string', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|confirmed',
        ], [
            'name.required' => '名前は必須です。',
            'email.required' => 'メールアドレスは必須です。',
            'email.unique' => 'このメールアドレスは既に登録されています。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'password.confirmed' => 'パスワード確認が一致しません。',
        ]);

        $updateUser = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        // パスワードが変更された場合は、パスワードを更新する
        if($request->filled('password')) {
            $updateUser['password'] = Hash::make($request->password);
        }

        $user->update($updateUser);

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user->fresh(),
            'success' => true,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        // ユーザーが見つからない場合は、404エラーを返す
        if(!$user) {
            return response()->json([
                'message' => 'User not found',
                'success' => false,
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
            'success' => true,
        ]);
    }

    // ログイン中ユーザーの複数選択削除
    public function bulkDelete(Request $request)
    {
        $updatedLogoutUsers = User::where('is_online', true)->update([
            'is_online' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => "{$updatedLogoutUsers} users logged out successfully",
        ]);
    }

    public function onLineUsers(Request $request)
    {
        $onlineUsers = User::where('is_online', true)
            ->where('last_login_at', '>=', now()->subMinutes(30))
            ->orderBy('last_login_at', 'desc')
            ->get();

        return response()->json([
            'onlineUsers' => $onlineUsers,
            'success' => true,
            'message' => 'Online Users fetched successfully',
        ]);
    }
}

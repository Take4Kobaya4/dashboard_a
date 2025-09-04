import { http, HttpResponse } from 'msw'; 

export const handlers = [
    // 認証関連
    http.post('/api/login', async ({ request }) => {
        interface LoginRequestBody {
            email: string;
            password: string;
        }
        const { email, password } = await request.json() as LoginRequestBody;

        if(email === 'test@example.com' && password === 'password123') {
            return HttpResponse.json({
                user: {
                    id: 1,
                    name: 'test',
                    email: 'test@example.com',
                    is_online: true
                }
            }, { status: 200})
        }

        // 認証失敗時、422を返す
        return HttpResponse.json({
            message: 'These credentials do not match our records.',
            errors: {
                email: ['These credentials do not match our records.']
            }
        }, { status: 422 })
    }),

    http.post('/api/register', async ({ request }) => {
        interface RegisterRequestBody {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }
        const { name, email } = await request.json() as RegisterRequestBody;
        return HttpResponse.json({
            user: {
                id: 2,
                name: name,
                email,
                is_online: true
            }
        }, { status: 201})
    }),

    http.post('/api/logout', () => {
        return HttpResponse.json({
            message: 'User logged out successfully', 
        }, { status: 200 })
    }),

    http.get('/api/me', () => {
        return HttpResponse.json({
            id: 1,
            name: 'test',
            email: 'test@example.com',
            is_online: true
        })
    }),

    // ユーザー一覧
    http.get('/api/users', ({ request }) => {
        const url = new URL(request.url);
        const page = url.searchParams.get('page') || 1;

        return HttpResponse.json({
            data: [
                {
                    id: 1,
                    name: 'test',
                    email: 'test@example.com',
                    is_online: true
                },
                {
                    id: 2,
                    name: 'test1',
                    email: 'test1@example.com',
                    is_online: true
                }
            ],
            current_page: parseInt(String(page)),
            last_page: 1,
            per_page: 10,
            total: 2,
        })
    }),
    http.get('/api/users/:id', ({ params }) => {
        const { id } = params;
        if(id === '1'){
            return HttpResponse.json({
                id: 1,
                name: 'test',
                email: 'test@example.com',
                is_online: true
            })
        }

        return HttpResponse.json({
            message: 'User not found',
        }, { status: 404 })
    }),

    http.post('/api/users', async ({ request }) => {
        const { name, email } = await request.json() as { name: string; email: string; };

        return HttpResponse.json({
            id: 3,
            name,
            email,
        }, { status: 201 })
    }),

    http.put('/api/users/:id', async ({ params, request }) => {
        const { id } = params;
        const { name, email } = await request.json() as { name: string; email: string; };

        return HttpResponse.json({
            id: parseInt(String(id)),
            name,
            email,
        }, { status: 200 })
    }),
    
    http.delete('/api/users/:id', () => {
        return HttpResponse.json({
            message: 'User deleted successfully',
        })
    }),

    // ログインユーザー一覧
    http.get('/api/online-users', () => {
        return HttpResponse.json([
            {
                id: 1,
                name: 'test',
                email: 'test@example.com',
                is_online: true
            },
            {
                id: 2,
                name: 'test1',
                email: 'test1@example.com',
                is_online: true
            }
        ])
    }),

    http.post('/api/bulk-delete', async ({ request }) => {
        const { data: { ids } } = await request.json() as { data: { ids: number[] } };
        return HttpResponse.json({
            message: 'Online users deleted successfully',
            deleted_ids: ids,
        }, { status: 200 });
    })
];
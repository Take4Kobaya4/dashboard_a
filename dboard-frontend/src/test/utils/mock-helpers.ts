import { vi } from "vitest";


// ルーターのモック
export const mockNavigate = vi.fn();
export const mockLocation = {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default'
}

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => mockLocation
    }
})

// Ant Designのメッセージもっく
export const mockMessage = {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    loading: vi.fn(),
}

vi.mock('antd', async () => {
    const React = await vi.importActual<typeof import('react')>('react');

    const Button = ({ children, onClick, type, htmlType, disabled, style, size, loading }: any) => (
        React.createElement('button', {
            onClick,
            'data-type': type,
            type: htmlType || 'button',
            disabled: disabled || loading,
            style,
            'data-size': size,
        }, children)
    );

    const Card = ({ children, style }: any) => (
        React.createElement('div', { style, 'data-antd': 'card' }, children)
    );

    const Space = ({ children, direction, size, style }: any) => (
        React.createElement('div', { style, 'data-direction': direction, 'data-size': size }, children)
    );

    const FormItem = ({ children, label, help }: any) => {
        const child = (React as any).Children.only(children) as any;
        const controlName = child?.props?.name || child?.props?.id;
        const id = controlName || undefined;
        const cloned = id ? (React as any).cloneElement(child, { id }) : child;
        return (React.createElement('div', null,
            label ? React.createElement('label', { htmlFor: id }, label) : null,
            cloned,
            help ? React.createElement('div', { role: 'alert' }, help) : null
        ));
    };
    const Form: any = ({ children, onFinish, layout }: any) => (
        React.createElement('form', { onSubmit: (e: any) => { e.preventDefault(); onFinish?.(); }, 'data-layout': layout }, children)
    );
    Form.Item = FormItem;

    const InputImpl = React.forwardRef<HTMLInputElement, any>((props, ref) => (
        React.createElement('input', { ...props, ref })
    ));
    const PasswordImpl = React.forwardRef<HTMLInputElement, any>((props, ref) => (
        React.createElement('input', { ...props, ref, type: 'password' })
    ));
    const Input: any = InputImpl as any;
    Input.Password = PasswordImpl;

    const Typography: any = {
        Title: ({ children, level, style }: any) => React.createElement(`h${level || 2}` as any, { style }, children),
        Text: ({ children }: any) => React.createElement('span', null, children),
    };

    return {
        Button,
        Card,
        Space,
        Form,
        Input,
        Typography,
        message: mockMessage,
        ConfigProvider: ({ children }: any) => React.createElement(React.Fragment, null, children),
    };
})

// localStorageのモック
export const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
})

// axiosのモック関数
const createAxiosInstance = () => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    defaults: {
        headers: {
            common: {},
        },
        withCredentials: true,
    },
    interceptors: {
        request: {
            use: vi.fn(),
            eject: vi.fn(),
        },
    },
});

export const mockAxios = {
    ...createAxiosInstance(),
    create: vi.fn(() => createAxiosInstance()),
}

vi.mock('axios', () => ({
    default: mockAxios,
    ...mockAxios,
}))

// テストのクリーンアップヘルパー
export const cleanupMocks = () => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
    mockMessage.success.mockClear()
    mockMessage.error.mockClear()
    mockMessage.warning.mockClear()
    mockMessage.info.mockClear()
}
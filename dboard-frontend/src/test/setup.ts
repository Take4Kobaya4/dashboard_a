import '@testing-library/jest-dom';
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { server } from './mocks/server';

// MSWサーバーセットアップ
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Ant Designのメッセージモック
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => {
        const mql = {
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn((callback: (e: { matches: boolean }) => void) => callback({ matches: false })),
            removeListener: vi.fn(),
            addEventListener: vi.fn((_, callback: (e: { matches: boolean }) => void) => callback({ matches: false })),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        } as unknown as MediaQueryList;
        return mql;
    }),
});

// antd の responsiveObserver を無効化するモック
// ライブラリ内部で listener にイベント引数が渡らず undefined になるケースを回避
// 参考: https://github.com/ant-design/ant-design/blob/master/components/_util/responsiveObserver.ts
vi.mock('antd/lib/_util/responsiveObserver', () => {
    const screens = { xs: false, sm: false, md: true, lg: false, xl: false, xxl: false } as Record<string, boolean>;
    const mockObserver = {
        subscribe: (cb: (screens: Record<string, boolean>) => void) => { cb(screens); return 1; },
        unsubscribe: (_: number) => {},
        dispatch: (_: Record<string, boolean>) => {},
    };
    return { default: mockObserver };
});

vi.mock('antd/es/_util/responsiveObserver', () => {
    const screens = { xs: false, sm: false, md: true, lg: false, xl: false, xxl: false } as Record<string, boolean>;
    const mockObserver = {
        subscribe: (cb: (screens: Record<string, boolean>) => void) => { cb(screens); return 1; },
        unsubscribe: (_: number) => {},
        dispatch: (_: Record<string, boolean>) => {},
    };
    return { default: mockObserver };
});

vi.mock('antd/lib/grid/hooks/useBreakpoint', () => ({
    default: () => ({}),
}));

vi.mock('antd/es/grid/hooks/useBreakpoint', () => ({
    default: () => ({}),
}));

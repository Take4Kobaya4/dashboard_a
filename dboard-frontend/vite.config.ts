/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost',
        // バックエンドのURL
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // /apiを削除
      },
      '/sanctum/csrf-cookie': {
        target: 'http://localhost',
        // バックエンドのURL
        changeOrigin: true,
        rewrite: path => path.replace(/^\/sanctum\/csrf-cookie/, '') // /sanctum/csrf-cookieを削除
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true // ソースマップを生成
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {
    projects: [
      {
        // Storybookテストプロジェクト
        extends: true,
        plugins: [
          // Storybook設定ファイルで定義されたストーリーのテストを実行するプラグイン
          // オプションについてはこちらを参照: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{
              browser: 'chromium'
            }]
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          // 通常のユニットテストファイルがStorybookプロジェクトで実行されないように除外
          exclude: ['**/*.{test,spec}.{js,jsx,ts,tsx}', 'node_modules', 'dist', '.idea', '.git', '.cache'],
        }
      },
      {
        // ユニット/コンポーネントテストプロジェクト (Vitest + React Testing Library)
        test: {
          environment: 'jsdom', // Reactコンポーネントのテストにはjsdom環境を使用
          setupFiles: ['src/test/setup.ts'], // VitestとReact Testing Libraryのセットアップファイル
          globals: true,
          css: true,
          restoreMocks: true,
          clearMocks: true,
          mockReset: true,
          // ユニット/コンポーネントテストファイルのみを含める
          include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
          // Storybookファイルがユニットテストプロジェクトで実行されないように除外
          exclude: ['**/*.stories.{js,jsx,ts,tsx}', 'node_modules', 'dist', '.idea', '.git', '.cache'],
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, 'src'),
          },
        },
      }
    ]
  }
});
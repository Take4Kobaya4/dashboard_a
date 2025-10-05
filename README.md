## 技術（フロントエンド）
- React 19.1.0
- TypeScript 5.8.3
- vite 7.0.4
- vitest 3.2.4
- react-hook-form 7.62.0
- react-router-dom 7.8.1
- styled-components 6.1.19
- zod 4.1.9
- ESLint
- storybook
- msw

## 技術（バックエンド）
- Laravel
- Sanctum

## 主な機能
- ユーザー認証（ログイン・ログアウト・会員登録）
- ユーザー一覧表示
- ユーザーの詳細表示
- ユーザーの作成・更新・削除
- オンラインユーザーの一覧表示
- オンラインユーザーの選択削除

## 設計
- Features構成:専属コンポーネントをfeaturesディレクトリ直下にし、共通コンポーネントをsharedディレクトリ直下にして対応

## 状態管理
- Context API：認証部分にてグローバルな状態管理を適応

## データフェッチ
- TanStackQuery

## UI/UX
- Material UI
- Styled-components: CSS-in-JSによるスタイリング

## セキュリティ
- JWTによる認証
- 保護ルートの実装


# Yatta!

> ちいさな"やった"を重ねるアプリ — 誰かの思いつきを、あなたの体験に。

カードUI中心のモバイルWebアプリ。クエストを"やってみる" → 記録する → コレクションする、というループで日常に小さな冒険を足します。

## スタック

| 領域 | 技術 |
| --- | --- |
| Frontend | Vite + React + TypeScript + Tailwind CSS + Framer Motion + Zustand |
| API | Cloudflare Pages Functions (`/functions`) |
| DB | Cloudflare D1 (SQLite) |
| Hosting | Cloudflare Pages (Git連携で自動デプロイ) |

---

## ローカル開発

### 1. 依存をインストール

```bash
npm install
```

### 2. モックモードで起動(DB不要・最速)

```bash
npm run dev
```

→ http://localhost:5173 で動きます。`src/lib/api.ts` のモックデータを使うので、Cloudflare 関連は何もセットアップ不要です。

### 3. 実DB(D1ローカル)で動かす

```bash
# 初回:ローカルD1にスキーマ + シード
npm run db:init:local
npm run db:seed:local

# Pages Functions と Vite を一緒に起動
echo "VITE_USE_MOCK=false" > .env.local
npx wrangler pages dev -- npm run dev
```

→ `wrangler pages dev` がフロント + Functions + ローカル D1 を統合して立ち上げます。

---

## Cloudflare デプロイ手順(初回のみ)

### A. D1 データベースを作る

```bash
npx wrangler login
npx wrangler d1 create yatta-db
```

出力された `database_id` を `wrangler.toml` の `REPLACE_WITH_YOUR_D1_ID` に書き込みます。

### B. リモート D1 にスキーマ + シード

```bash
npm run db:init:remote
npm run db:seed:remote
```

### C. Cloudflare Pages を Git 連携(自動デプロイ)

1. https://dash.cloudflare.com/ → Workers & Pages → Create → Pages → Connect to Git
2. `shippoworks/plan-app` を選択
3. ビルド設定:
   - Framework preset: **None** (Vite)
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Settings → Functions → D1 database bindings** で:
   - Variable: `DB`
   - D1 database: `yatta-db`
5. Save and Deploy

→ 以降は `git push` するだけで自動デプロイされます。

---

## ディレクトリ構成

```
plan-app/
├── src/
│   ├── pages/         # Home, Detail, Run, Done, Post, MyPage, Explore, Badges
│   ├── components/    # CardStack, QuestCard, BottomNav, Confetti, StatusBar
│   ├── lib/           # api.ts, store.ts (zustand), mockData.ts
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── functions/         # Cloudflare Pages Functions
│   └── api/
│       ├── quests/    # GET/POST /api/quests, GET /api/quests/:id
│       └── records.ts # POST /api/records
├── schema.sql
├── seed.sql
├── wrangler.toml
└── vite.config.ts
```

## 主要ルート

| パス | 画面 |
| --- | --- |
| `/` | ホーム(カードスタック) |
| `/explore` | さがす(タグ・グリッド) |
| `/quest/:id` | 詳細 |
| `/quest/:id/run` | クエスト実行 |
| `/quest/:id/done` | 完了演出 + 記録 |
| `/post` | 投稿 |
| `/badges` | 図鑑 |
| `/me` | マイページ |

## モック ↔ 実DB 切替

`.env.local`:

```bash
VITE_USE_MOCK=false   # 実DBを使う
# (未設定 or true ならモック)
```

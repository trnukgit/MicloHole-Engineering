# MORPHO 展示用セットアップ

## オフライン対応の準備

### 1. Three.js のダウンロード

Parameter Optimization ツールで3D表示に必要です。

1. WiFiのある環境で以下のURLにアクセス:
   https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js

2. ページを右クリック → 「名前を付けて保存」

3. ファイル名: `three.min.js`

4. `lib/` フォルダに保存

### 2. フォルダ構成（最終）

```
morpho-site/
├── index.html
├── studies.html
├── tool.html
├── signage-simulation.html
├── parameter-optimization.html
├── style.css
├── top.css
├── studies.css
├── tool.css
├── common.js
├── top.js
├── studies.js
├── Assets/
│   ├── morpho-logo.png
│   ├── morpho_zukai.png
│   ├── neopro_v3.mp4
│   └── Studies/
│       └── studies_top.mp4
└── lib/
    └── three.min.js  ← ダウンロードして配置
```

## iPad での表示方法

### 方法A: ファイルアプリから直接開く（簡単）
1. morpho-site フォルダを iPad に転送（AirDrop等）
2. ファイルアプリで `index.html` をタップ
3. Safari で開く

### 方法B: ローカルサーバー（推奨・より安定）
1. Mac に morpho-site フォルダを置く
2. ターミナルで:
   ```bash
   cd /path/to/morpho-site
   python3 -m http.server 8000
   ```
3. Mac と iPad を同じネットワーク（テザリング可）に接続
4. iPad の Safari で `http://[MacのIPアドレス]:8000` を開く

### 方法C: iPad 単体でローカルサーバー
1. App Store から「Pythonista 3」等をインストール
2. アプリ内でサーバーを起動

## 展示時の動作

- **20秒間操作がないと自動でトップページに戻ります**
- 対象: tool.html, signage-simulation.html, parameter-optimization.html, studies.html
- トップページ (index.html) では自動リセットしません

## トラブルシューティング

### 3D表示が動かない
→ `lib/three.min.js` が正しく配置されているか確認

### ページ遷移でエラー
→ ローカルサーバー経由でアクセスしてみる

### 動画が再生されない
→ Safari の自動再生設定を確認

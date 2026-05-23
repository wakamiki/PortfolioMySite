# PortfolioMySite

タイルUIを中心に制作しているポートフォリオサイトです。

ガラス質のタイル、淡い花の装飾、静かなアニメーションを組み合わせて、冷たく上品でありながら触ると柔らかい印象のUIを目指しています。

## 公開URL

https://wakamiki.github.io/PortfolioMySite/

## 概要

トップページは、以下の4つのタイルで構成しています。

- About: 自己紹介
- Works: 制作物一覧
- Blog: 外部ブログへのリンク
- GitHub: GitHubへのリンク

Worksでは、制作物の一覧から詳細表示へ切り替えられるようにしています。詳細ページでは、概要カードはHTML/CSSで実装し、説明資料部分はCanvaで作成した画像カードを表示しています。

## 見どころ

- CSS Gridを使ったタイルレイアウト
- `clip-path` による角落としタイル
- 花画像、枠SVG、ガラス膜を重ねたレイヤー表現
- hover / active時の小さな触感アニメーション
- About / Worksタイルの展開UI
- Works詳細ページ内のスクロール表示
- 外部リンク遷移時の画面遷移アニメーション
- 展開中タイル以外を操作できないようにするロック制御

## 使用技術

- HTML
- CSS
- JavaScript
- CSS Grid
- Flexbox
- CSS Animation / Transition

## ディレクトリ構成

```text
.
├── assets/
│   ├── images/
│   └── tiles/
├── css/
│   └── style.css
├── js/
│   └── script.js
├── docs/
├── index.html
└── README.md
```

## ローカルでの確認方法

`index.html` をブラウザで開くと確認できます。

```text
index.html
```

ビルド環境や外部パッケージのインストールは不要です。

## 制作方針

このサイトは、HTML / CSS / JavaScriptの理解を深めるために制作しています。

特に以下を意識しています。

- semantic HTML
- classの責務分離
- CSS Grid / Flexboxの理解
- JavaScriptによる状態classの付け外し
- 小さく自然なUIアニメーション
- 見た目と操作感の両立

## セキュリティ・公開前確認

公開前に以下を確認します。

- 外部リンクが正式URLになっていること
- 仮URLが残っていないこと
- 公開しない作業メモや個人情報を含めないこと
- 画像や録画に個人情報が写っていないこと
- JavaScriptで許可していない外部URLへ遷移しないこと

## 備考

このリポジトリはポートフォリオサイト制作の学習記録も兼ねています。制作過程の記録は `docs/daily-log/` に残しています。

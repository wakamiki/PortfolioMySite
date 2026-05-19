# Class Responsibility Guide

## 目的

この資料は、HTML / CSS / JavaScript の class に持たせる責務を整理し、同じ class に複数の役割を混ぜすぎないための判断基準を残すものです。

現在のトップページは、タイル共通構造、色ごとの差分、展開状態、装飾レイヤー、Works 内ページなどが重なっているため、class を「何を表すためのものか」で分けて考えます。

## 基本方針

1. 1つの class には、できるだけ1種類の責務だけを持たせる。
2. 共通見た目と、特定画面だけのレイアウトを分ける。
3. 状態変化は `is-*` class に寄せる。
4. 色や素材の違いは、構造 class とは別にする。
5. JavaScript は見た目を直接作らず、状態 class の付け外しを担当する。
6. 通常の見た目・配置・構造は、できるだけ単独 class で管理する。
7. `.parent .child` のような複合セレクタは、疑似状態、`is-*` 状態 class、展開時の内部パーツ制御などに限定する。

## 共通構造

部品としての土台を作る class です。

| class | 役割 |
| --- | --- |
| `.tile-wrap` | Grid 配置、外側の影、FLIP移動対象となるラッパー |
| `.tile` | メインタイル共通の形、質感、内側構造 |
| `.sub-tile` | サブタイル共通の形、質感 |
| `.scroll-area` | スクロールバー形状の共通指定 |

判断基準:

- About でも Works でも共通して使うか。
- 色や配置が変わっても残る土台の役割か。

## タイル表面テキスト

閉じているタイル表面や展開時ヘッダーで使うテキスト class です。

| class | 役割 |
| --- | --- |
| `.tile-title` | タイル見出しの文字スタイル |
| `.tile-subtitle` | タイル補足文の文字スタイル |
| `.tile-motion-text` | hover / active 時に動く文字として扱うためのclass |

`tile-title` と `tile-subtitle` は文字の見た目、`tile-motion-text` は動きの対象、という責務で分けます。

## タイル内部パーツ

タイル内部の構造を分ける class です。

| class | 役割 |
| --- | --- |
| `.tile-label` | About / Works の閉じている時の中央ラベル |
| `.blog-tile-label` | Blog タイル専用の閉じている時のラベル |
| `.tile-header` | 展開時のヘッダー領域 |
| `.tile-heading` | 展開時の見出しまとまり |
| `.tile-content` | 展開時の本文領域 |
| `.tile-close` | 閉じるボタン |

Blog は展開せず外部遷移するため、About / Works の展開制御に使う `.tile-label` とは分けて `.blog-tile-label` を使います。

## 種別・見た目

色、質感、タイル種別の違いを表す class です。

| class | 役割 |
| --- | --- |
| `.tile-about` / `.tile-works` / `.tile-blog` / `.tile-github` | メインタイルごとの色や専用見た目 |
| `.sub-tile-blue` / `.sub-tile-green` / `.sub-tile-purple` / `.sub-tile-ivory` | サブタイルの色 |
| `.tile-wrap-blue` / `.tile-wrap-green` / `.tile-wrap-purple` / `.tile-wrap-ivory` | 色に応じた外側の影 |
| `.about-scroll` / `.works-scroll` | スクロールバーの色 |

判断基準:

- 構造は同じで、色・質感だけ違うか。
- 同じHTML構造に別テーマを当てているだけか。

## 配置・レイアウト

その場所での並び方を決める class です。

| class | 役割 |
| --- | --- |
| `.sub1` から `.sub16` | サブタイル個別の Grid 位置 |
| `.tile-wrap-about` / `.tile-wrap-works` / `.tile-wrap-blog` / `.tile-wrap-github` | メインタイルごとの Grid 位置 |
| `.works-list-card` | Works 1ページ目の一覧カード |
| `.works-detail-card` | Works 2ページ目の詳細カード共通 |
| `.works-detail-summary-card` | Works 2ページ目冒頭の概要カード |

判断基準:

- 見た目の種類ではなく、その場でどう並ぶかを表しているか。
- 別ページでは同じ部品でも違う並びになるか。

## 状態 class

開閉、移動中、再表示中など、現在の状態だけを表す class です。

| class | 役割 |
| --- | --- |
| `.is-expanded` | タイルが展開中 |
| `.is-hidden` | Works 一覧ページを一時的に非表示 |
| `.is-active` | 現在表示中のページ、選択中の丸 |
| `.is-relocating` | 移動のために一時的に非表示 |
| `.is-evacuating` | 退避アニメーション中、かつ退避後の保持 |
| `.is-returning` | 再表示アニメーション中 |
| `.is-shifted-about` / `.is-shifted-works` | 展開に伴う移動後の配置 |
| `.is-page-loaded` | 初期非表示状態を抜けたページ |
| `.is-intro-playing` | 初期表示アニメーション再生中 |
| `.is-fade-in` | Blog 外部遷移オーバーレイの表示状態 |
| `.is-iris-in` | GitHub 外部遷移オーバーレイの表示状態 |

判断基準:

- 一時的に付く / 外れるものか。
- JavaScript が付け外しする対象か。
- 状態 class を追加したら、どこで外すか、または外部遷移まで保持するかを決める。

## 装飾レイヤー

情報ではなく、見た目の層を担当する class です。

| class | 役割 |
| --- | --- |
| `.tile-glass` | ガラス膜 |
| `.tile-frame` | 枠 SVG の共通配置 |
| `.tile-frame-about` / `.tile-frame-about-max` | About の通常枠 / 展開枠 |
| `.tile-frame-works` / `.tile-frame-works-max` | Works の通常枠 / 展開枠 |
| `.tile-flower` | 花画像の共通配置 |
| `.tile-flower-about` / `.tile-flower-works1` など | 花画像ごとの位置・色調整 |

判断基準:

- コンテンツではなく装飾レイヤーか。
- `z-index` や `blend-mode` の管理対象か。

## Works 周辺の整理方針

### `works-` と `work-` の使い分け

`works-` は Works エリアのページ構造、カード UI、ナビゲーション、状態管理に使います。
`work-` は作品 1 件の中身を表す部品に使います。

| prefix | 使う対象 | 例 |
| --- | --- | --- |
| `works-` | Works エリアのページ構造・カード UI | `.works-list-view`, `.works-detail-view`, `.works-list-card`, `.works-detail-card`, `.works-detail-summary-card`, `.works-pagination` |
| `work-` | 作品 1 件のデータ部品 | `.work-list-title`, `.work-detail-title`, `.work-list-description`, `.work-detail-description`, `.work-list-thumbnail`, `.work-detail-thumbnail`, `.work-tags`, `.work-tag` |

判断基準:

- Works ページ全体や表示領域、カードの種類を表すなら `works-` にする。
- 作品タイトル、説明、画像、タグなど、作品 1 件の中身を表すなら `work-` にする。
- `.works-detail-card` と `.works-detail-summary-card` は、作品データそのものではなく Works 詳細ページのカード UI なので `works-` にする。
- `.work-list-title` や `.work-detail-title` は、Works 全体の見出しではなく作品 1 件の情報なので `work-` にする。

### Works 共通

| class | 役割 |
| --- | --- |
| `.works-content` | Works 内の本文領域 |
| `.works-scroll` | Works 内スクロール領域とスクロールバー色 |
| `.work-tags` | タグ一覧の箱 |
| `.work-tag` | タグ1個 |

### Works 1ページ目

| class | 役割 |
| --- | --- |
| `.works-list-view` | 1ページ目の表示領域 |
| `.works-list` | 1ページ目の一覧リスト |
| `.works-list-card` | 1ページ目の一覧カード |
| `.work-list-item` | Works 内のリスト項目 |
| `.work-list-thumbnail` | 一覧カード用サムネイル |
| `.work-list-title` | 一覧カード用タイトル |
| `.work-list-description` | 一覧カード用説明文 |
| `.work-arrow` | 一覧カード右側の遷移記号 |

### Works 2ページ目

| class | 役割 |
| --- | --- |
| `.works-detail-view` | 2ページ目の表示領域 |
| `.works-detail-list` | 2ページ目の詳細セクション一覧 |
| `.works-detail-card` | 2ページ目の詳細カード共通 |
| `.works-detail-summary-card` | 2ページ目冒頭の概要カード |
| `.work-detail-thumbnail` | 詳細概要カード用サムネイル |
| `.work-detail-body` | 詳細概要カード右側の本文まとまり |
| `.work-detail-title` | 詳細ページ用タイトル / セクション見出し |
| `.work-detail-description` | 詳細ページ用説明文 |
| `.work-feature-card` | 主な機能の小カード |
| `.work-meta-card` | メタ情報タグ群の補助class |

### Works ページネーション

| class | 役割 |
| --- | --- |
| `.works-pagination` | Works 内ページ切り替えナビ |
| `.works-page-dot` | ページを示す丸 |
| `.works-page-dot.is-active` | 現在ページの丸 |
| `.works-back` | 詳細ページから一覧へ戻るボタン |

## 外部遷移アニメーション

| class | 役割 |
| --- | --- |
| `.blog-transition-overlay` | Blog 外部遷移時に画面全体を覆うレイヤー |
| `.blog-transition-bg` | Blog 遷移レイヤーの背景画像 |
| `.github-transition-overlay` | GitHub 外部遷移時に画面全体を覆うレイヤー |
| `.github-transition-bg` | GitHub 遷移用のアイリスイン背景 |

外部リンクへ遷移する演出では、遷移前に overlay の状態 class を外さず、画面遷移まで保持します。

## class を追加する前の確認

新しい class を作る時は、次の順で考えます。

1. これは構造、見た目、配置、状態、装飾のどれか。
2. 既存 class と役割が重複していないか。
3. 既存 class の責務を広げすぎていないか。
4. HTML 上の意味と、CSS 上の役割が一致しているか。
5. 将来別ページや別状態で再利用した時に困らないか。

## 迷った時の目安

### 共通 class に入れる

- どこでも同じ。
- 色や位置が変わっても残る。
- 部品の土台になる。

### 専用 class に分ける

- そのページだけで違う。
- 並び方だけが違う。
- 展開時だけ必要。
- 見た目は似ていても意味が違う。

### 状態 class にする

- JavaScript で付け外しする。
- 開閉や選択など、一時的な状態を表す。
- 常時付いている必要がない。

## 今後の整理候補

- `work-detail-title` を、作品名用とセクション見出し用に分けるか検討する。
- `work-list-item` を 1ページ目と2ページ目で分ける必要が出たら、`works-list-item` / `works-detail-item` のように分離する。
- CSS がさらに増えた段階で、共通・タイル・Works・アニメーション単位のファイル分割を検討する。

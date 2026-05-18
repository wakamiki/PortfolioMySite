# Class Responsibility Guide

## 目的

この資料は、HTML / CSS / JavaScript の class に持たせる責務を整理し、  
同じ class に複数の役割を混ぜすぎないための判断基準を残すものです。

現在のトップページは、タイル共通構造、色ごとの差分、展開時の状態、装飾画像、Works 内ページなどが重なっているため、  
class を「何を表すためのものか」で分けて考える。

## 基本方針

1. 1つの class には、できるだけ1種類の責務だけを持たせる。
2. 共通見た目と、特定画面だけのレイアウトを分ける。
3. 状態変化は `is-*` class に寄せる。
4. 色や素材の違いは、構造 class とは別にする。
5. JavaScript は見た目を直接作らず、状態 class の付け外しを担当する。

## class の種類

### 1. 共通構造 class

部品としての土台を作る class。

| class | 役割 |
| --- | --- |
| `.tile` | メインタイル共通の形、質感、内側構造 |
| `.sub-tile` | サブタイル共通の形、質感 |
| `.tile-wrap` | Grid 配置、外側の影、移動対象となるラッパー |
| `.scroll-area` | スクロールバー形状の共通指定 |

#### 判断基準

- 「About でも Works でも共通か」
- 「色や場所が変わっても残る役割か」

### 2. 種別・見た目 class

色や種類の違いを表す class。

| class | 役割 |
| --- | --- |
| `.tile-about` / `.tile-works` / `.tile-blog` / `.tile-github` | メインタイルごとの色や専用見た目 |
| `.sub-tile-blue` / `.sub-tile-green` / `.sub-tile-purple` / `.sub-tile-ivory` | サブタイルの色 |
| `.tile-wrap-blue` / `.tile-wrap-green` など | 色に応じた外側の影 |
| `.about-scroll` / `.works-scroll` | スクロールバーの色 |

#### 判断基準

- 「構造は同じで、色・質感だけ違うか」
- 「同じHTML構造に別テーマを当てているだけか」

### 3. 配置・レイアウト class

その場所での並び方を決める class。

| class | 役割 |
| --- | --- |
| `.sub1` から `.sub16` | サブタイル個別の Grid 位置 |
| `.works-list-view .work-card` | Works 一覧ページ専用のカード並び |
| `.work-summary-card` | Works 詳細ページ冒頭の概要カード用レイアウト |
| `.work-detail-card` | Works 詳細ページの通常カード |

#### 判断基準

- 「見た目の種類ではなく、その場でどう並ぶかを表しているか」
- 「別ページでは同じ部品でも違う並びになるか」

#### 例

```html
<button class="work-card">...</button>
```

`work-card` は 1 ページ目の一覧カード専用。

```html
<section class="work-detail-card work-summary-card">...</section>
```

`work-detail-card` は 2 ページ目カード共通、  
`work-summary-card` はその中でも表題カード専用。

### 4. 状態 class

開閉、移動中、再表示中など、現在の状態だけを表す class。

| class | 役割 |
| --- | --- |
| `.is-expanded` | タイルが展開中 |
| `.is-hidden` | Works 一覧ページを一時的に非表示 |
| `.is-active` | 現在表示中のページ、選択中の丸 |
| `.is-relocating` | 移動のために一時的に非表示 |
| `.is-evacuating` | 退避アニメーション中、かつ退避後の保持 |
| `.is-returning` | 再表示アニメーション中 |
| `.is-shifted-about` / `.is-shifted-works` | 展開に伴う移動後の配置 |
| `.is-disabled` | 非アクティブで操作不可 |
| `.is-page-loaded` | 初期非表示状態を抜けたページ |
| `.is-intro-playing` | 初期表示アニメーション再生中 |

#### 判断基準

- 「一時的に付く / 外れるものか」
- 「JavaScript が付け外しする対象か」

#### 注意

- `.is-*` class には、できるだけ恒久的な見た目を持たせない。
- 複数の状態 class が同時に付く時は、役割が衝突していないか確認する。

### 5. 内部パーツ class

部品の中身を分ける class。

| class | 役割 |
| --- | --- |
| `.tile-label` | 閉じている時の見出し |
| `.tile-header` | 展開時のヘッダー領域 |
| `.tile-heading` | 展開時の見出しまとまり |
| `.tile-content` | 展開時の本文領域 |
| `.tile-close` | 閉じるボタン |
| `.work-card-body` | 一覧カード右側の本文まとまり |
| `.work-detail-body` | 詳細冒頭カード右側の本文まとまり |
| `.work-tags` | タグ一覧 |

#### 判断基準

- 「部品内部の意味あるまとまりか」
- 「見た目のためだけでなく、構造上も分ける理由があるか」

### 6. 装飾 class

情報ではなく、見た目の層を担当する class。

| class | 役割 |
| --- | --- |
| `.tile-glass` | ガラス膜 |
| `.tile-frame` | 枠 SVG |
| `.tile-flower` | 花画像の共通配置 |
| `.tile-flower-about` / `.tile-flower-works1` など | 花画像ごとの位置・色調整 |

#### 判断基準

- 「コンテンツではなく装飾レイヤーか」
- 「z-index や blend-mode の管理対象か」

## Works 周辺の現在の整理方針

| class | 役割 |
| --- | --- |
| `.work-card` | 1 ページ目の一覧カード |
| `.work-detail-card` | 2 ページ目の詳細カード共通 |
| `.work-summary-card` | 2 ページ目冒頭の概要カード |
| `.works-list-view` | 1 ページ目の表示領域 |
| `.works-detail-view` | 2 ページ目の表示領域 |
| `.work-content` | Works 内の本文領域 |
| `.work-detail-scroll` / `.works-scroll` | 詳細ページのスクロール領域と色指定 |

## class を追加する前の確認

新しい class を作る時は、次の順で考える。

1. これは構造、見た目、配置、状態、装飾のどれか。
2. 既存 class と役割が重複していないか。
3. 既存 class の責務を広げすぎていないか。
4. HTML 上の意味と、CSS 上の役割が一致しているか。
5. 将来別ページや別状態で再利用した時に困らないか。

## 迷った時の目安

### 共通 class に入れる

- どこでも同じ
- 色や位置が変わっても残る
- 部品の土台になる

### 専用 class に分ける

- そのページだけで違う
- 並び方だけが違う
- 展開時だけ必要
- 見た目は似ていても意味が違う

### 状態 class にする

- JavaScript で付け外しする
- 開閉や選択など、一時的な状態を表す
- 常時付いている必要がない

## 今後の整理候補

- `About` / `Works` の退避処理と移動処理を小さな関数へ分ける。
- `Works` 詳細ページのカード群について、`work-detail-card` 配下の部品 class をさらに整理する。
- CSS がさらに増えた段階で、共通・タイル・Works・アニメーション単位のファイル分割を検討する。

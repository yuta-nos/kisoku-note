# kisoku note について

kisoku noteは、文書のバージョン管理用のWEBアプリケーションです。  
ページ上で作成・保存した文書について、簡単な操作でバージョンの更新、および更新履歴の管理をすることができます。

[kisoku noteトップページ](https://web.kisoku-note.site/)

<img width="1440" alt="kisokunote_TOPページプレビュー" src="https://github.com/yuta-nos/kisoku-note/assets/120769259/a02ac6c9-a0b9-4d2c-a5f7-27bb4cb3b365">

## 制作経緯

本アプリの制作者は、とある地方の中小医療機器メーカーにて法令遵守体制整備や社内規定の作成・運用を業務として行なってきました。  
  
社内の慣習として、Wordなどの文書作成ソフトであらゆる文書が作成されており、作成した文書を各自が明確なルールなしに社内共有サーバー上に保管しているような状態でした。  
  
すると、例えばある規則を定めた文書の改訂・更新を行う際、以下のような問題が頻繁に発生していました。
  
- 似たような（紛らわしい）ファイル名が大量発生し、そもそもどの文書が最新版か探すのが大変  
  例： 「202310_規則.docx」　、「最新版_規則.docx」 、「規則 確定版.docx」 …
- 最新版が判明したとして、なぜ前回のバージョンから更新したのか理由が記録されておらず、経緯をベテラン社員に聞いて回る必要がある
- 文書のバージョン管理ツールを導入しようとしても、PCの操作が苦手な社員は複雑な機能を使いこなせない（結果として導入されない）
  
長年このような管理体制であったために、資料探しや文書更新時に、毎回多くの時間と労力をかけてしまっている大変非効率的な状況でした。

そこでこのような課題を抱えている組織を対象に据えて、以下の要求事項を満たすようなWEBアプリの制作に取り掛かりました。
1. **文書保管場所のオンライン集約化** ： ページの作成・保管をオンラインに集約することで保管場所を探す手間を省く
2. **直感的なバージョン更新機能** ： PC操作に慣れていない人でもボタンクリックで簡単にバージョン更新ができる設計
3. **更新履歴一覧の自動作成機能** ： 過去の更新履歴を自動で整理して一覧表示させるページの実装

## 機能
主要な機能は以下の通りです。  
  
- ユーザー登録
- ログイン/ログアウト
- チーム登録
- チーム招待（未実装）
- 文書カテゴリ登録
- 文書作成（WYSIWYGエディタ）
- 文書保存
- 文書更新（バージョン更新なし）
- 文書更新（バージョン更新あり）
- 文書バージョン更新履歴確認

## 使用技術
- フロントエンド
    - React（18.2.0）- ライブラリ
    - vite（4.2.0）- ビルドツール
    - React Router Dom（18.2.0）- ルーティング
    - React Redux（8.1.2）- 状態管理
    - Redux Toolkit（1.9.5）- 状態管理
    - Chakra-ui（2.8.1）- スタイリング
    - axios（1.5.0）- HTTPクライアント
    - draft-js（0.11.7）- フレームワーク
- バックエンド
    - Ruby on Rails（7.0.7）APIモード - フレームワーク
    - devise（4.9.2）- ユーザー認証
    - devise_token_auth（1.2.2）- tokenでのユーザー認証
    - active_model_serializers（0.10.13）- json成形
- インフラ
    - cloudfront
    - APIリクエスト
      - VPC
      - ALB
      - Fargate
      - RDS（mySQL)
    - 静的コンテンツ取得
      - Route53
      - Amazon S3
- 環境構築
    - Docker
    - docker-compose
- バージョン管理
    - Github

## インフラ構成図

![kisoku-note_AWS構成図](https://github.com/yuta-nos/kisoku-note/assets/120769259/51fe7dbb-f204-4a6e-a7d1-658f32275b28)

## 

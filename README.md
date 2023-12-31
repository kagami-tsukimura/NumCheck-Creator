# NumCheck Creator

NumCheck Creator は、CloudTech の問題再確認を目的として作成されたツールです。  
CloudTechとの連携はないため、汎用的なチェックボックスツールとして使用できます。

## 概要

このツールは、以下の機能を提供します。

- テキストボックスに入力した数に基づいてチェックボックスを生成。
- チェックの入った問題番号に遷移して、問題の再確認。

## Demo

[NumCheck Creator Demo](https://kagami-tsukimura.github.io/NumCheck-Creator/)

## 実行手順

1. プロジェクトをクローンします。

   ```bash
   git clone https://github.com/kagami-tsukimura/NumCheck-Creator.git
   cd NumCheck-Creator
   ```

1. 依存関係をインストールします。

   ```bash
   npm install
   ```

1. ローカルサーバーを起動します。

   ```bash
   npm start
   ```

1. ブラウザで <http://localhost:3000> にアクセスすることでツールを使用します。

## 使用方法

1. 数値入力: テキストボックスに任意の数値を入力します。
1. チェックボックス生成: 入力した数値に基づいて、チェックボックスが生成されます。
1. 問題のチェック: 間違えた問題など、再度確認したい特定の問題にチェックを入れます。
1. 問題再確認: チェックの入っている問題番号に遷移して、問題の再確認を行います。

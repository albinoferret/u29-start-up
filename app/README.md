# 1.type scriptインストール
```bash
yarn add global typescript
```

## 2.Expo Clientのインストール
スマホにExpo Clientをインストールする。
スマホとPCを同一ネットワーク上に配置する。

## 3.パッケージマネージャー起動
```bash
cd app
yarn install
yarn start
```

## 4.aws-export.js更新
app/aws-export.jsを最新のものに差し替える。
※リモートリポジトリにはpushしないこと。

## 5. バーコードのURLを携帯で読み取る
yarn start(expo start)実行後に表示されるバーコードをスマホで読み取る。
※AndroidならExpo Client上から、iPhoneならバーコードリーダー等を利用する。

接続できない場合は、Expo DevTools(localhost:19002)を開き、
「Connection > Tunnel」で表示したバーコードを読み取る。

## 【備考】
+ windowsでyarn global addが効かない問題
⇒Pathにコマンド「yarn global bin」の結果を追加。
https://www.slightedgecoder.com/2017/12/30/yarn-global-add-command-not-work-windows/


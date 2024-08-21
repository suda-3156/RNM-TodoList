
使い方：

react-appとapiディレクトリ直下に.envファイルをそれぞれ追加し、自分のIPアドレス　or　localhost　を入れる

ついでに、./db/logs/mysql-error.log,mysql-query.log,mysql-slow.logをつくる

reactの方は VITE_IP = ..., nodeの方は、NODE_IP = ...

react-appとapiディレクトリ下でnpm ciをする

docker compose up -d でhttp://{設定したアドレス}:5174にアクセスする

docker compose exec db bash

mysql -u root -p // DB_PASS を入力

create database todo;

use todo;

create table todos (
  id varchar(100) not null primary key,
  title varchar(100),
  completed bool default false,
  deleted bool default false
);

これで使えるはずです。

参考：

Jotaiのshow caseにあるTodo ListでatomFamilyを使うバージョン

使ったもの：

jotai, useForm, 他便利そうなライブラリ

やりたいこと：

・初回レンダリング時に、todoIdsとtodoAtomをとってきて、deletedtodoをつくるorこれもとってくるようにすべき？

・あと、awaitとasync, promiseを適切に使えていないのでなおす。



・順番が変わらないように、日時の降順とかにする

・loading画面

・ログイン画面

・トークンを使った,apiの操作

・どうやらrootユーザーでの開発はよくないらしい
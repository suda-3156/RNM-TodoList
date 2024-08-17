
使い方：

react-appとapiディレクトリ直下に.envファイルをそれぞれ追加し、自分のIPアドレス　or　localhost　を入れる

reactの方は VITE_IP = ..., nodeの方は、NODE_IP = ...

react-appとapiディレクトリ下でnpm ciをする
docker compose up -d でhttp://{設定したアドレス}:5174にアクセスする

参考：

Jotaiのshow caseにあるTodo ListでatomFamilyを使うバージョン

使ったもの：

jotai, useForm, 他便利そうなライブラリ

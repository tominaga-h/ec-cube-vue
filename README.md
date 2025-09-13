# EC-CUBE-VUE

このリポジトリは、[SkipTheDragon/inertia-bundle](https://github.com/SkipTheDragon/inertia-bundle) を使用して**EC-CUBE4.3のフロントエンドにVueを利用**できるようにしたものです。

## 特徴

- VueのSFC(単一ファイルコンポーネント)を利用可能
- TypeScriptサポート
- Scssサポート
- Webpack-Encoreを利用
- PHPのコントローラーからVueコンポーネントに `Props` を設定可能
- Twigも利用可能
- Vuetifyサポート
- コンポーネントの自動登録

## Docker環境

`Makefile` を用意しているので、下記の通りDocker環境を操作できます。

- `make up` - Dockerコンテナ起動
- `make down` - Dockerコンテナ削除
- `make logs` - Dockerコンテナのログを表示
- `make shell` - EC-CUBEコンテナに `bash` で接続
- `make node` - Nodejsコンテナに `bash` で接続
- `make cc` - EC-CUBEコンテナでキャッシュクリア

## JavaScriptのビルド

EC-CUBE4.3から、EC-CUBEのコンテナから **Node環境が別コンテナに分離**されました(`docker-compose.nodejs.yml`)。デフォルトでは `docker run` を使用しますが、コマンドが長くなるので `make node` でNodeコンテナに接続し、`npm` などのコマンドを実行する形にしました。

### ビルド手順

1. `make up` でDockerコンテナ起動
2. `make node` でNodeコンテナに接続
3. `npm run build` でビルド実行

## Vueコンポーネント利用方法

### フォルダ構造

`.vue` ファイルは `html/template/inertia/assets/vue` 配下に配置してください。`vue` 配下は以下のフォルダ構造になっています。

```txt
vue
 ├── components
 ├── layouts
 └── pages
```

- `components/` - Vueコンポーネントを配置
- `layouts/` - ページのレイアウトを配置
- `pages/` - PHPコントローラーからレンダリングする.vueファイルを配置

### コントローラーからVueコンポーネントをレンダリング

`AbstractController` を拡張することで、コントローラー内で `$this->inertia->render` を使いVueコンポーネントをレンダリングできます。

```php
<?php

namespace Customize\Controller;

use Customize\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class WelcomeController extends AbstractController
{
    /**
     * @Route("/welcome", name="welcome", methods={"GET"})
     */
    public function index()
    {
        // 使用するtwigファイルを指定できる
        $this->inertia->setRootView('welcome.twig');

        // `welcome` は `html/template/inertia/assets/vue/pages/welcome.vue` を指す
        return $this->inertia->render('welcome', [
            // 連想配列でpropsを渡す
            'name' => 'Hayato Tominaga',
        ]);

    }
}
```

### Twig

`setRootView` で指定するTwigファイルには、**必ず記載が必要な情報**があります。

```twig
{% extends 'base.html.twig' %}

{% block main %}
  {{ inertia(page) }}
{% endblock %}
```

`base.html.twig` は `default_frame.twig` を拡張したInertia用のtwigファイルです。

Vueを使う上で必ず指定が必要なのが

```twig
  {{ inertia(page) }}
```

この `inertia(page)` です。

### EC-CUBEのレイアウトを利用するためには

Twigを利用しても、このままではEC-CUBEのレイアウトは表示されません。EC-CUBEのレイアウトを利用するためには `dtb_page` 及び `dtb_page_layout` にレコードの追加が必要です。

#### dtb_page

|カラム名|値|
|---|---|
|master_page_id|NULL|
|page_name|Welcome(ページ名)|
|url|welcome(ページURL)|
|file_name|welcome(twigファイル名)|
|edit_type|2|
|author|NULL|
|description|NULL|
|keyword|NULL|
|create_date|now()|
|update_date|now()|
|meta_robots|NULL|
|meta_tags|NULL|
|discriminator_type|page|

#### dtb_page_layout

|カラム名|値|
|---|---|
|page_id|(dtb_pageの該当ID)|
|layout_id|2|
|sort_no|(sort_noの最大値+1)|
|discriminator_type|pagelayout|

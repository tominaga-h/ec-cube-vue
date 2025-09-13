const path = require('path');
const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment('production');
}

Encore
  // === 出力先 ===
  .setOutputPath('html/bundle/')
  .setPublicPath('/html/bundle') // html/ がドキュメントルートの場合は /bundle でOK

  // === エントリ ===
  .addEntry('front',   './html/template/default/assets/js/bundle.js')
  .addEntry('admin',   './html/template/admin/assets/js/bundle.js')
  .addEntry('install', './html/template/install/assets/js/bundle.js')
  .addEntry('inertia', './html/template/inertia/assets/vue/app.ts')

  // === ローダ/機能 ===
  .enableVueLoader()            // .vue (SFC)
  .enableTypeScriptLoader()     // .ts / <script lang="ts">
  .enableSassLoader()           // .scss / <style lang="scss">

  // 画像/フォント（旧 url-loader 相当）
  .addLoader({
    test: /\.(png|jpe?g|gif|svg|eot|woff2?|ttf)$/i,
    loader: 'url-loader',
    options: {
      limit: 8192, // 8KB までは DataURL にインライン化
      name: 'assets/[name].[hash:8].[ext]'
    }
  })

  // jQuery の Provide（旧 ProvidePlugin 相当）
  .autoProvidejQuery()

  // === ソースマップ/チャンク/ハッシュ ===
  .enableSourceMaps(!Encore.isProduction())
  .splitEntryChunks()
  .enableSingleRuntimeChunk()
  .enableVersioning(Encore.isProduction())

  // === 解決/エイリアス（既存の jquery エイリアス互換） ===
  .addAliases({
    'jquery': path.join(__dirname, 'node_modules', 'jquery'),
    '@': path.resolve(__dirname, 'html/template/inertia/assets/vue')
  })

  // === ファイル名（任意で整理） ===
  .configureFilenames({
    js:   'js/[name].[contenthash].js',
    css:  'css/[name].[contenthash].css',
    assets: 'assets/[name].[hash:8][ext]'
  })

  // === feature flags ===
  .configureDefinePlugin(options => {
    options['__VUE_OPTIONS_API__'] = JSON.stringify(true);   // options APIを使うならtrue
    options['__VUE_PROD_DEVTOOLS__'] = JSON.stringify(false); // 本番でdevtoolsを無効
    options['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = JSON.stringify(false); // SSR未使用ならfalseでOK
  })
;

module.exports = Encore.getWebpackConfig();

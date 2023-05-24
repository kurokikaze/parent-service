
[vite-plugin-federation](https://github.com/originjs/vite-plugin-federation) - импорт @T-Systems/ происходит дважды
Документация [Webpack-Module-Federation](https://webpack.js.org/concepts/module-federation/)
Документация [Module-Federation-Plugin](https://webpack.js.org/plugins/module-federation-plugin/)


## Проблемы

`Cannot read properties of undefined (reading 'meta')` : не хватает записи в конфиге `vue.conf.js` подключаемого модуля:
```
configureWebpack: {
    output: {
      libraryTarget: 'system',
    },
  },
```

`Refused to load the image data:`: не хватает `img-src 'self' single-spa.js.org data:` в meta-записи в корневом html (сама запись есть).

Подключение TypeScript:

Ставим loader и typescript

```
yarn add typescript ts-loader
```

Добавляем `tsconfig.json`

```
{
  "extends": "ts-config-single-spa",
  "files": ["src/T-Systems-root-config.ts"],
  "compilerOptions": {
    "declarationDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.test*"]
}
```

Расширяем конфиг в `vue.config.js`

```
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      libraryTarget: 'system',
    },
  },
```

При ошибке подключения `.vue`-файла из ts-скрипта: не хватает `.d.ts` файла со следующим содержимым:

```
declare module '*.vue';
```

Добавление `lang="ts"` в скрипт вызывает ошибку лоадера.

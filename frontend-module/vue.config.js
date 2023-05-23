const { defineConfig } = require('@vue/cli-service')
const config = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    entry: './src/app.ts',
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
    externals: '@T-Systems/FleetAPI',
    externalsType: 'system',
  },
})

console.log(JSON.stringify(config, null, 2))
module.exports = config
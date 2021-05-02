// Importação dos plugins necessários
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.join(__dirname, '/build');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (env, argv) {
  const isDevelopment = argv.mode === 'development';
  return {
    // O arquivo principal da nossa aplicação
    entry: [
      './src/index.tsx'
    ],

    // A saída da aplicação quando for feito a build de produção
    // Aqui você especifica a pasta e
    // o nome dos bundles, seguindo a seguinte tabela:
    // https://webpack.js.org/configuration/output/#outputdevtoolmodulefilenametemplate
    output: {
      path: outputPath,
      filename: 'static/js/[name].[hash:8].bundle.js',
      publicPath: '/',
    },
    // Extensões que o webpack deve processar
    resolve: {
      extensions: ['.ts', '.tsx', '.js', 'jsx'],
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      compress: true,
      port: 9000,
      stats: 'errors-only',
      historyApiFallback: true
    },
    devtool: "source-map",
    stats: "errors-only",
    module: {
      // Nessa parte, define-se os loaders que serão
      // utilizados pelo webpack
      rules: [
        // Carregamento do Babel
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
        // Carregamento do Sass/SCSS
        {
          test: /\.s[ac]ss$/i,
          // O webpack carrega o loader de trás pra frente:
          // resolve-url-loader -> sass-loader ->
          // css-loader -> style-loader | mini-css
          use: [
            // Todo o CSS injetdo como inline,
            // é mais rápido para criar e lento para executar
            // Por isso a condicional para escolher entre
            // style-loader e mini-css
            isDevelopment ?
              'style-loader' :
              {
                loader: MiniCssExtractPlugin.loader,
              },
            // Armazena o conteúdo CSS em CommonJS
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            // Resolve os import e url relativo ao
            // arquivo que está executando-os para o funcionamento
            // do Sass
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: false,
              },
            },
            // Compila Sass/SCSS em CSS
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          // Carrega as imagens através do webpack
          // para a aplicação.
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                // Nome das imagens na build
                name: '[name].[hash:8].[ext]',
                // Diretório de todas as imagens na pasta dist
                outputPath: 'static/media',
                esModule: false
              },
            },
          ],
        },
        {
          // Carrega as imagens através do webpack
          // para a aplicação.
          test: /\.(woff|woff2)$/,
          use: {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'static/fonts',
                  esModule: false
              },
          },
        },
      ],
    },
    // Instâncias dos plugins
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        // Caminho do index.html para injetar os bundles
        template: './public/index.html',
        favicon: "./public/favicon.ico",
      }),
      new PreloadWebpackPlugin(
        {
          fileBlacklist: [/\.(png|jpe?g|gif|svg|js|ico|css|map)$/],
          rel: 'preload',
          include: 'allAssets' ,
          as(entry) {
            if (/\.css$/.test(entry)) return 'style';
            if (/\.woff|woff2$/.test(entry)) return 'font';
            return 'script';
          }
        }
      ),
      new MiniCssExtractPlugin({
        // Nome dos arquivos CSS gerados na build de produção
        filename: 'static/css/[name].[hash:8].css',
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          severityError: 'warning',
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            [
              'svgo',
              {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
          configFile: path.join(__dirname, 'tsconfig.json')
        },
        async: isDevelopment
      }),
    ],
    performance: { hints: false }
  }
};

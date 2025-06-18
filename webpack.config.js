const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Für die Produktion
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin'); // Für Bildoptimierung

module.exports = (env, argv) => { // Erlaubt den Zugriff auf CLI-Argumente wie --mode
  const isProduction = argv.mode === 'production'; // Prüft, ob es ein Produktions-Build ist

  return {
    mode: isProduction ? 'production' : 'development', // Setzt den Modus basierend auf dem Argument
    entry: './src/main.js', // Dein Haupt-JavaScript-Einstiegspunkt
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js', // Hinzufügen von Hashes für Produktion (Cache-Busting)
      path: path.resolve(__dirname, 'dist'), // Ausgabeverzeichnis
      clean: true, // Bereinigt den 'dist' Ordner vor jedem Build
      publicPath: '/', // Wichtig für Routing und Asset-Pfade im Root-Verzeichnis
    },
    module: {
      rules: [
        // Regel für JavaScript (mit Babel für ältere Browser-Kompatibilität)
        {
          test: /\.js$/,
          exclude: /node_modules/, // Schließt node_modules aus der Transpilierung aus
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Ermöglicht moderne JS-Features
            },
          },
        },
        // Regel für CSS
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader', // Nutzt style-loader für Dev, MiniCssExtractPlugin für Prod
            'css-loader',
          ],
        },
        // Regel für Bilder (png, svg, jpg, jpeg, gif)
        // Verwendet asset/resource, um Bilder in den dist-Ordner zu kopieren
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            // Optional: Benennungskonvention für Bilder im dist-Ordner
            filename: 'images/[name].[hash][ext]',
          },
        },
        // Regel für Fonts (optional, falls du lokale Fonts verwendest, z.B. von Boxicons, wenn nicht über CDN)
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name].[hash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // Pfad zu deiner HTML-Vorlage
        filename: 'index.html', // Name der Ausgabedatei im 'dist' Ordner
        // Optional: Minifizieren der HTML-Datei für die Produktion
        minify: isProduction ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        } : false,
      }),
      // MiniCssExtractPlugin nur für den Produktionsmodus hinzufügen
      isProduction && new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css', // Hinzufügen von Hashes für Produktion
      }),
      // ImageMinimizerPlugin nur für den Produktionsmodus hinzufügen
      isProduction && new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { name: 'preset-default' }],
            ],
          },
        },
      }),
    ].filter(Boolean), // filter(Boolean) entfernt 'false' Einträge (Plugins, die nicht im Dev-Modus sind)
    devServer: {
      static: './dist', // Dateien, die vom Dev-Server bereitgestellt werden
      open: true, // Öffnet den Browser automatisch
      hot: true, // Ermöglicht Hot Module Replacement (HMR) für eine schnelle Entwicklung
      compress: true, // Aktiviert Gzip-Kompression für alles, was bereitgestellt wird
      port: 8080, // Optional: Spezifischer Port
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map', // Bessere Source Maps für Debugging
  };
};
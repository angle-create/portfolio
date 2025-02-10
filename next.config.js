/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 静的エクスポートの設定
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
  experimental: {
    optimizeFonts: false
  },
  // キャッシュの設定
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 1分
    pagesBufferLength: 2,
  },
  // experimental: {
  //   optimizeCss: true,
  // },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      }

      // アセットの処理設定
      config.module.rules.push({
        test: /\.(ico|png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext]'
        }
      })

      // フォントローダーの設定を追加
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash].[ext]',
            publicPath: '/_next',
          },
        },
      })

      // グローバルオブジェクトの設定
      config.output = {
        ...config.output,
        globalObject: 'globalThis',
        assetModuleFilename: 'static/[hash][ext][query]'
      }

      // チャンクサイズの制限を設定
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 20000000, // 20MB
          maxAsyncSize: 20000000, // 20MB
          maxInitialSize: 20000000, // 20MB
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
              maxSize: 20000000, // 20MB
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 20,
              maxSize: 20000000, // 20MB
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name(module, chunks, cacheGroupKey) {
                return `${cacheGroupKey}-${module.type}`;
              },
              priority: 15,
              minChunks: 1,
              reuseExistingChunk: true,
              maxSize: 20000000, // 20MB
            },
          },
        },
      }
    }
    return config
  },
}


module.exports = nextConfig 
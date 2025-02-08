/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // バンドルサイズを最適化するための設定
  output: 'standalone',
  experimental: {
    optimizeCss: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドのビルドでは@sendgrid/mailを使用しない
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // バンドルサイズを削減するための設定
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 24000000, // 24MB未満に制限
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // モジュールのコンテキストが存在することを確認
              if (!module.context) {
                return 'vendor'
              }
              // node_modulesからパッケージ名を抽出
              const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)
              if (!match || !match[1]) {
                return 'vendor'
              }
              // スコープ付きパッケージ対応
              const packageName = match[1]
              return `npm.${packageName.replace('@', '').replace(/[\\/]/g, '_')}`
            },
            chunks: 'all',
            priority: 1,
          },
        },
      },
    }

    return config
  },
}

module.exports = nextConfig 
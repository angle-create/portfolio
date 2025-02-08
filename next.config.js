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
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]
              return `npm.${packageName.replace('@', '')}`
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
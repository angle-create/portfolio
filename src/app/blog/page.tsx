'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

// 仮のブログデータ（後でCMSから取得するように変更）
const posts = [
  {
    id: 1,
    title: 'Cloudflareを使用したJamstackサイトの構築方法',
    excerpt: 'Cloudflare PagesとKV、Workersを組み合わせて、高速で安全なJamstackサイトを構築する方法をご紹介します。',
    date: '2024-02-06',
    category: 'Technical',
    tags: ['Cloudflare', 'Jamstack', 'Web Development'],
  },
  {
    id: 2,
    title: 'Next.jsとTypeScriptで始めるモダンな開発',
    excerpt: 'Next.jsとTypeScriptを組み合わせた開発環境の構築から、実践的なアプリケーション開発までを解説します。',
    date: '2024-02-05',
    category: 'Programming',
    tags: ['Next.js', 'TypeScript', 'React'],
  },
  // 他の記事...
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = Array.from(new Set(posts.map((post) => post.category)))

  return (
    <div className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          技術的な知見や経験をシェアします
        </p>
      </motion.div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="記事を検索..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">すべてのカテゴリー</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8"
      >
        {filteredPosts.map((post) => (
          <motion.article
            key={post.id}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Link href={`/blog/${post.id}`}>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                    {post.category}
                  </span>
                  <time className="text-gray-500 dark:text-gray-400 text-sm">
                    {post.date}
                  </time>
                </div>
                <h2 className="text-2xl font-bold mb-2 hover:text-secondary transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </div>
  )
} 
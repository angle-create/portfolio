'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '認証に失敗しました')
      }

      if (data.success) {
        // ログイン成功時の処理
        // Cookieの設定を待つため、少し待機
        await new Promise(resolve => setTimeout(resolve, 1000))
        // 強制的にページ遷移
        window.location.href = '/blog/admin'
      } else {
        throw new Error('認証に失敗しました')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('パスワードが正しくありません')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-gradient">管理者ログイン</span>
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn btn-primary"
          >
            {isLoading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>
      </motion.div>
    </div>
  )
} 
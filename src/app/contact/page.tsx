'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface ContactInfo {
  icon: string
  label: string
  value: string
  link?: string
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const contactInfo: ContactInfo[] = [
    {
      icon: '📧',
      label: 'メール',
      value: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
      link: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
    },
    {
      icon: '📱',
      label: '電話',
      value: process.env.NEXT_PUBLIC_CONTACT_PHONE || '',
      link: `tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`,
    },
    {
      icon: '📍',
      label: '住所',
      value: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || '',
    },
    {
      icon: '💬',
      label: 'LINE',
      value: process.env.NEXT_PUBLIC_CONTACT_LINE || '',
    },
    {
      icon: '🐦',
      label: 'Twitter',
      value: process.env.NEXT_PUBLIC_CONTACT_TWITTER || '',
      link: `https://twitter.com/${process.env.NEXT_PUBLIC_CONTACT_TWITTER?.replace('@', '')}`,
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: process.env.NEXT_PUBLIC_CONTACT_GITHUB || '',
      link: `https://github.com/${process.env.NEXT_PUBLIC_CONTACT_GITHUB}`,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'メールの送信に失敗しました')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Contact</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          お気軽にお問い合わせください
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 連絡先情報 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">連絡先情報</h2>
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={info.label} className="flex items-start space-x-4">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    {info.label}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 問い合わせフォーム */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">お問い合わせフォーム</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                件名
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="text-green-600 dark:text-green-400">
                メッセージを送信しました。
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 dark:text-red-400">
                送信に失敗しました。もう一度お試しください。
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 
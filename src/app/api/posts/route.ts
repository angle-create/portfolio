import { NextResponse } from 'next/server'

// Cloudflare KVの型定義
interface KVNamespace {
  get(key: string): Promise<string | null>
  put(key: string, value: string): Promise<void>
  list(): Promise<{ keys: { name: string }[] }>
  delete(key: string): Promise<void>
}

// 環境変数の型定義
declare global {
  const BLOG_POSTS: KVNamespace
}

export const runtime = 'edge'
export const preferredRegion = ['all']

export async function GET() {
  try {
    const { keys } = await BLOG_POSTS.list()
    const posts = await Promise.all(
      keys.map(async (key) => {
        const post = await BLOG_POSTS.get(key.name)
        return post ? JSON.parse(post) : null
      })
    )
    return NextResponse.json(posts.filter(Boolean))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const post = await request.json()
    const id = `post_${Date.now()}`
    await BLOG_POSTS.put(id, JSON.stringify({ ...post, id }))
    return NextResponse.json({ id, ...post })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
} 
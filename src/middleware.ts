import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// シンプルな署名検証関数
async function verifyToken(token: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder()
    const data = encoder.encode(token.split('.')[1])
    const signature = token.split('.')[2]
    
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    return await crypto.subtle.verify(
      'HMAC',
      key,
      Buffer.from(signature, 'base64url'),
      data
    )
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname)
  const token = request.cookies.get('auth_token')?.value
  console.log('Found token:', token ? 'yes' : 'no')

  // ベースURLの取得
  const baseUrl = request.nextUrl.origin

  // ログインページへのアクセスをチェック
  if (request.nextUrl.pathname === '/blog/login') {
    console.log('Checking login page access')
    
    if (token) {
      try {
        const isValid = await verifyToken(token, process.env.JWT_SECRET || '')
        if (isValid) {
          console.log('Token valid, redirecting to admin')
          return NextResponse.redirect(new URL('/blog/admin', request.url))
        }
      } catch (error) {
        console.error('Token verification failed on login page:', error)
      }
      const response = NextResponse.next()
      response.cookies.delete('auth_token')
      return response
    }
    // 未ログインの場合はそのまま表示
    return NextResponse.next()
  }

  // 管理者ページへのアクセスをチェック
  if (request.nextUrl.pathname.startsWith('/blog/admin')) {
    console.log('Checking admin access')
    
    if (!token) {
      console.log('No token found, redirecting to login')
      return NextResponse.redirect(new URL('/blog/login', request.url))
    }

    try {
      const isValid = await verifyToken(token, process.env.JWT_SECRET || '')
      if (isValid) {
        console.log('Token verified successfully')
        return NextResponse.next()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
    }
    const response = NextResponse.redirect(new URL('/blog/login', request.url))
    response.cookies.delete('auth_token')
    return response
  }

  // APIルートの保護
  if (request.nextUrl.pathname.startsWith('/api/posts') && request.method !== 'GET') {
    if (!token) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    try {
      const isValid = await verifyToken(token, process.env.JWT_SECRET || '')
      if (isValid) {
        return NextResponse.next()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
    }
    return NextResponse.json({ error: '認証が無効です' }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/admin/:path*', '/blog/login', '/api/posts/:path*'],
} 
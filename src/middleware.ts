import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

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
        console.log('Verifying token for login page')
        verify(token, JWT_SECRET)
        console.log('Token valid, redirecting to admin')
        return NextResponse.redirect(new URL('/blog/admin', request.url))
      } catch (error) {
        console.error('Token verification failed on login page:', error)
        const response = NextResponse.next()
        response.cookies.delete('auth_token')
        return response
      }
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
      console.log('Verifying token with secret:', JWT_SECRET ? 'secret exists' : 'no secret')
      const decoded = verify(token, JWT_SECRET)
      console.log('Token verified successfully:', decoded)
      return NextResponse.next()
    } catch (error) {
      console.error('Token verification failed:', error)
      const response = NextResponse.redirect(new URL('/blog/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }
  }

  // APIルートの保護
  if (request.nextUrl.pathname.startsWith('/api/posts') && request.method !== 'GET') {
    if (!token) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
    }

    try {
      verify(token, JWT_SECRET)
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json({ error: '認証が無効です' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/admin/:path*', '/blog/login', '/api/posts/:path*'],
} 
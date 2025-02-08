import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

// デバッグ用のログ出力
console.log('JWT_SECRET:', JWT_SECRET)
console.log('ADMIN_PASSWORD:', ADMIN_PASSWORD)
console.log('NODE_ENV:', process.env.NODE_ENV)

export const runtime = 'edge'
export const preferredRegion = ['all']

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    console.log('Auth attempt with password:', password ? '***' : 'none')
    console.log('JWT_SECRET exists:', !!JWT_SECRET)

    if (!ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD is not set')
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: '認証に失敗しました' },
        { status: 401 }
      )
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not set')
    }

    // JWTの生成
    const secret = new TextEncoder().encode(JWT_SECRET)
    const token = await new jose.SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    console.log('Generated token:', token ? 'success' : 'failed')

    // レスポンスオブジェクトを作成
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    )

    // Cookieを設定
    console.log('Setting cookie with token')
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24時間
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: '認証処理に失敗しました' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth_token')?.value
    console.log('Checking auth status, token exists:', !!token)

    if (!token || !JWT_SECRET) {
      return NextResponse.json({ isAuthenticated: false })
    }

    try {
      // JWTの検証
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jose.jwtVerify(token, secret)
      console.log('Token verified:', payload)
      return NextResponse.json({ isAuthenticated: true })
    } catch (error) {
      console.error('Token verification failed:', error)
      return NextResponse.json({ isAuthenticated: false })
    }
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ isAuthenticated: false })
  }
} 
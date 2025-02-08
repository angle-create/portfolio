import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// SendGrid APIキーを設定
const apiKey = process.env.SENDGRID_API_KEY
if (apiKey) {
  sgMail.setApiKey(apiKey)
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!apiKey) {
      throw new Error('SendGrid API key is not set')
    }

    // メール本文を作成
    const mailData = {
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
      from: process.env.NEXT_PUBLIC_CONTACT_EMAIL!, // 送信元は認証済みのメールアドレスである必要があります
      subject: `[ポートフォリオ] ${subject}`,
      text: `
名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}
      `,
      html: `
<h3>ポートフォリオサイトからのお問い合わせ</h3>
<p><strong>名前:</strong> ${name}</p>
<p><strong>メールアドレス:</strong> ${email}</p>
<br>
<p><strong>メッセージ:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // 自動返信メールのデータ
    const autoReplyData = {
      to: email,
      from: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
      subject: '【自動返信】お問い合わせありがとうございます',
      text: `
${name} 様

お問い合わせありがとうございます。
以下の内容で承りました。

件名: ${subject}

メッセージ:
${message}

内容を確認次第、改めてご連絡させていただきます。
しばらくお待ちくださいますようお願い申し上げます。
      `,
      html: `
<p>${name} 様</p>
<br>
<p>お問い合わせありがとうございます。</p>
<p>以下の内容で承りました。</p>
<br>
<p><strong>件名:</strong> ${subject}</p>
<br>
<p><strong>メッセージ:</strong></p>
<p>${message.replace(/\n/g, '<br>')}</p>
<br>
<p>内容を確認次第、改めてご連絡させていただきます。</p>
<p>しばらくお待ちくださいますようお願い申し上げます。</p>
      `,
    }

    // メールを送信
    await Promise.all([
      sgMail.send(mailData),
      sgMail.send(autoReplyData),
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send mail error:', error)
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    )
  }
} 
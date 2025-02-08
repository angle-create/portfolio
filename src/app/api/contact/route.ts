import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!process.env.RESEND_API_KEY) {
      throw new Error('Resend API key is not set')
    }

    // 管理者宛のメール
    const adminEmail = await resend.emails.send({
      from: `Contact Form <${process.env.NEXT_PUBLIC_CONTACT_EMAIL}>`,
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
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
    })

    // 自動返信メール
    const autoReply = await resend.emails.send({
      from: `Portfolio <${process.env.NEXT_PUBLIC_CONTACT_EMAIL}>`,
      to: email,
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
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send mail error:', error)
    return NextResponse.json(
      { error: 'メールの送信に失敗しました' },
      { status: 500 }
    )
  }
} 
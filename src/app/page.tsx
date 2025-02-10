'use client'

export default function Home() {
  return (
    <div className="container py-20">
      {/* Hero Section */}
      <section className="text-center mb-20 slide-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Welcome to My Portfolio</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
          フルスタックエンジニア & クリエイター
        </p>
      </section>

      {/* About Section */}
      <section className="mb-20 fade-in" style={{ '--index': '1' } as React.CSSProperties}>
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          最新のウェブ技術を活用して、美しく機能的なウェブアプリケーションを作成することに情熱を注いでいます。
          Cloudflareの各種サービスを活用し、高パフォーマンスで安全なウェブサイトの開発に取り組んでいます。
        </p>
      </section>

      {/* Skills Section */}
      <section className="mb-20 fade-in" style={{ '--index': '2' } as React.CSSProperties}>
        <h2 className="text-3xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-container">
          {[
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Cloudflare',
            'React',
            'Node.js',
            'GraphQL',
            'AWS',
          ].map((skill, index) => (
            <div
              key={skill}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center stagger-item"
              style={{ '--index': index } as React.CSSProperties}
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Latest Projects */}
      <section className="fade-in" style={{ '--index': '3' } as React.CSSProperties}>
        <h2 className="text-3xl font-bold mb-6">Latest Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((project) => (
            <div
              key={project}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  プロジェクトの説明がここに入ります。
                </p>
                <button className="btn btn-primary">詳細を見る</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 
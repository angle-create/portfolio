'use client'

const projects = [
  {
    id: 1,
    title: 'ポートフォリオサイト',
    description: 'Next.js、TailwindCSS、Framer Motionを使用した個人ポートフォリオサイト。Cloudflareを活用したモダンなウェブアプリケーション。',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Cloudflare'],
    image: '/projects/portfolio.jpg',
    github: 'https://github.com/yourusername/portfolio',
    demo: 'https://your-portfolio.pages.dev',
  },
  {
    id: 2,
    title: 'AI チャットボット',
    description: 'OpenAI APIを利用した高度な自然言語処理が可能なチャットボットアプリケーション。リアルタイムレスポンスと履歴管理機能を実装。',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB'],
    image: '/projects/chatbot.jpg',
    github: 'https://github.com/yourusername/chatbot',
    demo: 'https://your-chatbot.pages.dev',
  },
  {
    id: 3,
    title: 'タスク管理アプリ',
    description: 'ドラッグ&ドロップに対応したモダンなタスク管理アプリケーション。リアルタイム同期とチーム共有機能を実装。',
    technologies: ['Vue.js', 'Firebase', 'Vuetify', 'TypeScript'],
    image: '/projects/taskmanager.jpg',
    github: 'https://github.com/yourusername/taskmanager',
    demo: 'https://your-taskmanager.pages.dev',
  },
]

export default function Projects() {
  return (
    <div className="container py-20">
      <div className="text-center mb-12 slide-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          私が手がけた主要なプロジェクトをご紹介します
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden stagger-item"
            style={{ '--index': index } as React.CSSProperties}
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700">
              <div className="w-full h-48 bg-gradient-to-r from-secondary to-accent opacity-50" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1 text-center"
                >
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline flex-1 text-center"
                >
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 
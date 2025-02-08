'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'フロントエンド',
    skills: [
      { name: 'React/Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'TailwindCSS', level: 90 },
      { name: 'HTML/CSS', level: 95 },
    ],
  },
  {
    title: 'バックエンド',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 85 },
      { name: 'GraphQL', level: 75 },
      { name: 'REST API', level: 90 },
    ],
  },
  {
    title: 'インフラ/DevOps',
    skills: [
      { name: 'Cloudflare', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 80 },
    ],
  },
  {
    title: 'その他',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Agile/Scrum', level: 85 },
      { name: 'UI/UX Design', level: 75 },
      { name: 'Testing', level: 80 },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
}

const SkillBar = ({ name, level }: { name: string; level: number }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-gray-700 dark:text-gray-300">{name}</span>
      <span className="text-gray-700 dark:text-gray-300">{level}%</span>
    </div>
    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-gradient-to-r from-secondary to-accent"
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  </div>
)

export default function Skills() {
  return (
    <div className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-gradient">Skills</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          私のスキルセットと経験をご紹介します
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-gradient">
              {category.title}
            </h2>
            {category.skills.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">資格・認定</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            'AWS Certified Solutions Architect',
            'Google Cloud Professional Engineer',
            'LPIC Level 3',
          ].map((certification) => (
            <div
              key={certification}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
                {certification}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
} 
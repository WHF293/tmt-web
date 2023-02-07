import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  extract: {
    include: ['**/*.{jsx,tsx,scss,css}'],
    exclude: ['node_modules', '.git', '.dist', 'public', '.husky', 'mock'],
  },
  // 组装新的类名
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-items-center': 'flex items-center',
    'flex-justify-center': 'flex justify-center',
    'flex-justify-end': 'flex justify-end items-center',
    'flex-justify-between': 'flex justify-between items-center',
    'common-page': 'w-1200px m-auto rounded-lg'
  }
})

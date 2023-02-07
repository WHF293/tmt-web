module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-control-statements', '@typescript-eslint'],
  rules: {
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any
    'jsx-control-statements/jsx-use-if-tag': 'off', // 可以使用3元运算符
    'jsx-control-statements/jsx-jcs-no-undef': 'off', // 关闭自定义类型文件 d.ts 还提示报错问题
    '@typescript-eslint/no-unused-vars': 'off', // 关闭变量引入或定义后没有使用时的的报错
    'react-hooks/exhaustive-deps': 'off', // 关闭 useEffect 空数组时的报错
  },
  extends: ['react-app', 'plugin:jsx-control-statements/recommended'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'], //别名路径
        ],
      },
    },
  },
}

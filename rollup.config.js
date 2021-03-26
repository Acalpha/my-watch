
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload'

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/bundle.js",
    format: "umd",
    name: "experience",
  },
  plugins: [
    // 本地服务器
    serve({
      open: true, // 自动打开页面
      port: 8000, 
      openPage: '/www/index.html', // 打开的页面
    }),
    livereload({
      watch: ['dist', 'www']
    }),
  ]
};

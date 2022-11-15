import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {
	VantResolve
} from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(),
		styleImport({
			resolves: [VantResolve()],
		}),
	],
	publicPath: './',
	build: {
		chunkSizeWarningLimit:1500,
		rollupOptions: {
			output:{
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				}
			}
		}
	},
	resolve: {
		alias: {
			'@': '/src'
		}
	},
	// css: {
	// 	loaderOptions: {
	// 		postcss: {
	// 			plugins: [require('tailwindcss'), require('autoprefixer')]
	// 		}
	// 	}
	// },
	// css: {
	// 	//css预处理
	// 	preprocessorOptions: {
	// 		scss: {
	// 			/*
	// 			引入var.scss全局预定义变量，
	// 			如果引入多个文件，
	// 			可以使用
	// 			'@import "@/assets/scss/globalVariable1.scss";@import "@/assets/scss/globalVariable2.scss";'
	// 			这种格式
	// 			 */
	// 			additionalData: '@import "@/assets/scss/globalVariable.scss";'
	// 		}
	// 	}
	// }
})
/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	async rewrites() {
		return {
			beforeFiles: [{
				source: '/api/:path*',
				destination: 'http://localhost:5000/:path*',
			}],
		}
	},
	async redirects() {
		return [{
			source: '/',
			destination: '/projects',
			permanent: true,
		}]
	},
	experimental: {
		modularizeImports: {
			'@mui/material': {
				transform: '@mui/material/{{member}}',
			},
			'@mui/icons-material': {
				transform: '@mui/icons-material/{{member}}',
			},
		},
	},
}

module.exports = nextConfig

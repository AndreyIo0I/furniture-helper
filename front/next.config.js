/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	async redirects() {
		return [{
			source: '/',
			destination: '/projects',
			permanent: true,
		}]
	},
}

module.exports = nextConfig

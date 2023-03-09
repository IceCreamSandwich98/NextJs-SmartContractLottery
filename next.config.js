/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptomized: true,
        loader: "akamai",
        path: "",
    },
}

module.exports = nextConfig

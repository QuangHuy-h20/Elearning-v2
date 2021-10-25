/** @type {import('next').NextConfig} */
module.exports = {
  images:{
    domains: ['storage.googleapis.com'],
    loader: 'imgix',
    path: 'https://storage.googleapis.com/upload-image-elearning',
    // disableStaticImages: true
  },
  reactStrictMode: true,
}

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,

    experimental: {
        appDir: true,
    },

    images: {
        domains: [
            'upload.wikimedia.org',
            'img.icons8.com',
            'fastly.picsum.photo',
            'lh3.googleusercontent.com',
            'www.foodandwine.com',
            'scontent-iad3-2.xx.fbcdn.net',
            'res.cloudinary.com',
            'firebasestorage.googleapis.com'
        ]
    },


    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        })
        return config
    },
}

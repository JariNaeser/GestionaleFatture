module.exports = {
    //General
    SERVER_PORT: 2000,
    HASH_SALT: '-salt',
    MEDIA_FOLDER_PATH: '/Users/jarinaser/Desktop/Jari/Development/GestionaleFatture/src/backend/media/',
    //Database
    DATABASE: {
        USER: 'GF_Admin',
        PASSWORD: 'cd0dc2d19261fa53a9c75d6daa68bb13d087474bbd9bab55ea9e1072ef9c53f7',
        HOST: 'localhost',
        DATABASE: 'GestionaleFatture',
        PORT: 3306
    },
    //JWT
    TTL: 60 * 60 * 24,  // 1 day
    ACCESS_TOKEN_SECRET: 'bb76beec2f6b80197c0a1490193ba8ed8f57d52d363a9c247de3f3daac5aab8a7dcbde286df3a1770c67be94df94da1f0097d65d5594e98048c6976a53000fb2',
    REFRESH_TOKEN_SECRET: '9ae4ab54dead91407c3d0fa6b9592c86a4e293f6363bc960a200200d83a3b3e31956ae626a433f6c4f43a71b1b5837f04b206c023dbefe7aa716d23e861f6320'
};
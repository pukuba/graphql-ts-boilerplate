const config = {
    DB_HOST: process.env.DB_HOST || "mongodb://localhost:27017/test",
    PORT: process.env.PORT || 3000,
    HOST_PATH: process.env.HOST_PATH || "http://localhost"
}

export default config
module.exports = {
    MONGO_USER: process.env.MONGO_USER || "mongo-user",
    MONGO_PW:   process.env.MONGO_PW   || "Passw0rd!",
    MONGO_IP:   process.env.MONGO_IP   || "mongo-db",
    MONGO_PORT: process.env.MONGO_PORT || "27017",
    REDIS_URL:  process.env.REDIS_URL  || "redis",
    REDIS_PORT: process.env.REDIS_PORT || "6379",
    SECRET:     process.env.SECRET
}
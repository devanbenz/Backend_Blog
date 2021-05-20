const { MONGO_USER, MONGO_PORT, MONGO_IP, MONGO_PW, REDIS_URL, REDIS_PORT, SECRET } = require('./config/config')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const redis = require('redis')


// ---------------------------- Mongo DB stuff ------------------------------

// Create a URL using exports from config.js 
const mongourl =`mongodb://${MONGO_USER}:${MONGO_PW}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// Function that will auto connect mongo db through mongoose.connect 
const connectWithRetry = () => {
    mongoose.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to mongo!'))
    .catch(e => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    })
}
// Run connection
connectWithRetry()
//------------------------------ Redis --------------------------------------
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})

// ---------------------- Express stuff ---------------------------------

const app = express()
const port = process.env.PORT || 3000

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUnitialized: false,
        httpOnly: true,
        maxAge: 30000000
    }
}))

// Testing GET method - just to make sure application is running
app.get('/', (req,res) => {
    res.send(`Application running`)
})

// need to use express.json() middleware or else json will not stick
app.use(express.json())
// Routers for api 
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)

// webserver started and listening 
app.listen(port, () => {
    console.log(`Application running on http://localhost:${port}`)
})


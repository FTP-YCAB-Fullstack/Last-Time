const Redis = require('redis')


const RedisClient = Redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})


RedisClient.on('error' , err => {
    if(err) return console.log('Redis Error => ' + err)
    console.log('success connect redis')
})



class RedisHelper {
    static mapParams = (params) => {
        let key = params[0], exp = null, cb = null
        if (params.length === 3) {
            exp = params[1]
            cb = params[2]
        } else if (params.length === 2) {
            exp = 3600
            cb = params[1]
        }
        return {
            key,exp,cb
        }
    }
    
    static getOrSet = (...params) => {
        let {key , exp , cb} = this.mapParams(params)

        return new Promise((resolve, reject) => {
            RedisClient.get(key, async (error, data) => {
                if (error) return reject(error)
                if (data !== null) return resolve(JSON.parse(data))

                try {
                    const freshData = await cb()
                    RedisClient.setex(key, exp, JSON.stringify(freshData))
                    resolve(freshData)
                } catch (error) {
                    return reject(error)
                }
            })
        })
    }

    static set = (...params) => {
        let { key, exp, cb } = this.mapParams(params)

        return new Promise(async (resolve , reject) => {
            try {
                const freshData = await cb()
                RedisClient.setex(key, exp, JSON.stringify(freshData))
                resolve(freshData)
            } catch (error) {
                return reject(error)
            }
        })
    }
}

module.exports = RedisHelper
const axios = require('axios')

class ApiController {
    // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=e48711e8da3535fc19321ecae74e0e89

    static getData = async (req,res,next) => {
        try {
            const {lat, lon} = req.query
            console.log(lat,lon)
            let result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${Math.round(lat)}.44&lon=${Math.round(lon)}&exclude=hourly,daily&appid=${process.env.API_KEY}`)
            let weather = result.data.current.weather[0]
            res.status(200).json({weather})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ApiController
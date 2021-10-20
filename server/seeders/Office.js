const User = require('../models/User')
const Office = require('../models/Office')
const Faker = require('faker/locale/id_ID')
const bcrypt = require('bcryptjs')

class OfficeSeeder {
    static generate = async(total = 10) => {
        for (let i = 0; i < total; i++) {
            let data =  {
                name: Faker.address.cityName(),
                email: Faker.internet.email(),
                role: 'user',
                subRole: ['pickuper'],
                password: bcrypt.hashSync('admin123'),
            }
            let user = await User.create(data)
            await Office.create({
                user: user._id,
            })
            console.log(data)
        }
        console.log('----------- generate office complete ------------')
    }

    static get = async() => {
        let offices = await Office.find().populate('user' , 'name email').transform((items) => {
            return items.map(item => {
                return {
                    id: item._id,
                    name: item.user.name,
                    email: item.user.email,
                    customers: item.customers,
                }
            })
        })
        console.log(offices)
        console.log('total office => ' , offices.length)
    }
}

module.exports = OfficeSeeder
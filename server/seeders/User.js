const User = require('../models/User')
const Faker = require('faker/locale/id_ID')
const bcrypt = require('bcryptjs')

class UserSeeder {
    static admin = async (total = 10) => {
        for (let i = 1; i < total; i++) {
            let data = {
                name: Faker.name.findName(),
                email: Faker.internet.email(),
                role: 'admin',
                password: bcrypt.hashSync('admin123'),
            }
            await User.create(data)
            console.log(data)
        }
    }
}

module.exports = UserSeeder
const User = require('../models/User')
const Faker = require('faker/locale/id_ID')
const bcrypt = require('bcryptjs')
const Customer = require('../models/Customer')
const Office = require('../models/Office')

class CustomerSeeder {
    static getOfficeId = async() => {
        let offices = await Office.find()
        let officesId = offices.map(office => office._id)
        return Faker.random.arrayElement(officesId)
    }
    static generate = async(total=10) => {
        for (let i = 0; i < total; i++) {
            let officeId = await this.getOfficeId()
            // create for user
            let data = {
                name: Faker.name.findName(),
                email: Faker.internet.email(),
                role: 'user',
                password: bcrypt.hashSync('admin123'),
            }
            const user = await User.create(data)
            console.log(data)

            // create for customer
            let dataCustomer = {
                user: user._id,
                office: officeId,
                address: Faker.address.city(),
                status: 'accepted',
            }
            const customer = await Customer.create(dataCustomer)
            console.log(customer)

            // update office
            let office = await Office.findByIdAndUpdate({ _id: officeId }, {
                $push: {
                    customers: customer
                }
            })
            console.log(office)
        }
    }
}

module.exports = CustomerSeeder
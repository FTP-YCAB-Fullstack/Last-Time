const bcrypt = require('bcryptjs')
const Office = require('../models/Office')
const User = require('../models/User')

class OfficeController {
    static getAll = async (req,res,next) => {
        try {
            let offices = await Office.find()
                            .select('user customers')
                            .populate('user' , "name")
                            
            offices = offices.map(office => {
                return {
                    _id: office._id,
                    user: office.user.name,
                    customers: office.customers.length
                }
            })

            res.status(200).json(offices)
        } catch (error) {
            next(error)
        }
    }

    static create = async (req,res,next) => {
        const {name,email,password} = req.body
        try {
            let user = await User.create({
                name,email,
                password: bcrypt.hashSync(password),
                role: "user",
                subRole: ["pickuper"]
            })
            Office.create({
                user: user._id
            })
            res.status(201).json({
                message: "created successfully",
            })
        } catch (error) {
            next(error)
        }        
    }

    static getDetail = async (req,res,next) => {
        const {id} = req.params
        try {
            const office = await Office.findById(id).populate('user' , 'name email')
                                    .populate({
                                        path: 'customers',
                                        select: 'address status',
                                        populate: {
                                            path: 'user',
                                            select: 'email name'
                                        }
                                    })
            if(!office) return next({name: "NotFound"})
            res.status(200).json({office})
        } catch (error) {
            next(error)
        }
    }

    static destroy = async (req,res,next) => {
        const {id} = req.params
        try {
            let office = await Office.findByIdAndDelete(id)
            await User.findByIdAndDelete(office.user)
            res.status(200).json({
                message: "Deleted data succesfully"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = OfficeController
const Customer = require('../models/Customer')
const Office = require('../models/Office')
const moment = require('moment')

class CustomerController {
    static getAll = async (req,res,next) => {
        try {
            const customers = await Customer.find()
            res.status(200).json({customers})
        } catch (error) {
            next(error)
        }
    }

    static create = async(req,res,next) => {
        const {officeId , address} = req.body
        try {
            let customer = await Customer.create({
                user: req.currentUser.id,
                office: officeId,
                address: address,
            })

            let office = await Office.findByIdAndUpdate({_id: officeId} , {
                $push: {
                    customers: customer
                }
            })
            res.status(200).json({
                customer
            })
        } catch (error) {
            next(error)
        }
    }

    static checkStatus = async(req,res,next) => {
        try {
            let user = req.currentUser
            let customer = await Customer.findOne({user: user._id}).sort({createdAt: -1}).populate({path: 'office' , populate: {path: 'user'}}).transform(data => {
                return data ? {
                    _id: data.id,
                    user: data.user,
                    office: data.office.user.name,
                    status: data.status,
                    reason: data.reason,
                    createdAt: moment(data.createdAt).fromNow(),
                    updatedAt: moment(data.updatedAt).fromNow(),
                } : null
            })
            let response = customer ? 
                        {
                            message: "You are already registered as a customer",
                            status: true,
                            customer
                        } :
                        {
                            message: "You are not registered as a customer",
                            status: false,
                        }
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static getByToken = async(req,res,next) => {
        let id = req.currentUser._id
        let office = await Office.findOne({user: id})
        let status = req.query.status
        if(!status) status = 'waiting'
        console.log(`status => ` + status)
        try {
            // count data by category
            let count = {
                waiting: await Customer.find({office: office._id , status: 'waiting'}).count(),
                accepted: await Customer.find({office: office._id , status: 'accepted'}).count(),
                reject: await Customer.find({office: office._id , status: 'reject'}).count(),
            }
            
            // set all data customer
            let customers = await Customer.find({office: office._id , status: status})
                                .select("user status address")
                                .populate("user" , "name")
            customers = customers.map(customer => {
                return {
                    _id: customer._id,
                    user: customer.user.name,
                    status: customer.status,
                    address: customer.address,
                }
            })

            res.status(200).json({ count, customers})
        } catch (error) {
            next(error)
        }
    }
    
    static getByOffice = async(req,res,next) => {
        const {officeId} = req.params
        try {
            let customers = await Customer.find({office: officeId})
                                    .select("user status address")
                                    .populate("user" , "name")
            customers = customers.map(customer => {
                return {
                    _id: customer._id,
                    user: customer.user.name,
                    status: customer.status,
                    address: customer.address,
                }
            })

            res.status(200).json({customers})
        } catch (error) {
            next(error)
        }
    }

    static delete = async(req,res,next) => {
        const {id} = req.params
        const user = req.currentUser
        try {
            if(!user.subRole.includes('pickuper') && user.role !== 'admin') return next({name: 'Unauthorize'})
            let customer = await Customer.findByIdAndDelete(id)
            if(!customer) return next({name: "NotFound"})

            await Office.findByIdAndUpdate({_id: customer.office}, {
                $pull: {
                    customers: customer._id
                }
            })

            res.status(200).json({
                message: "Deleted succesfully",
            })
        } catch (error) {
            next(error)
        }
    }

    static updateStatus = async(req,res,next) => {
        const {id} = req.params
        const {status} = req.body
        try {
            let customer
            if(status !== 'reject') {
                customer = await Customer.findByIdAndUpdate(id, {status})
            } else {
                const {reason} = req.body
                if(!reason) return next({name: "Validation" , message: "Apabila ditolak, alasan wajib diisi"})
                customer = await Customer.findByIdAndUpdate(id, {status , reason})
            }
            
            res.status(200).json({
                message: "Update status successfully",
            })
        } catch (error) {
            next(error) 
        }
    }

}

module.exports = CustomerController
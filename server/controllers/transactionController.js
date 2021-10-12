const Transaction = require('../models/Transaction')
const Office = require('../models/Office')
const Customer = require('../models/Customer')
const User = require('../models/User')

class TransactionController {
    static getAll = async (req,res,next) => {
        try {
            const transactions = await Transaction.find().select("user status")
            res.status(200).json(transactions)
        } catch (error) {
            next(error)
        }
    }
    
    static create = async (req,res,next) => {
        const {userId, officeId ,rubbish, poin} = req.body
        try {
            const transaction = await Transaction.create({
                    office: officeId,
                    user:userId, 
                    status: "waiting", 
                    rubbish,poin})
            const office = await Office.findOneAndUpdate({_id: officeId},{
                $push: {
                    transactions: transaction
                }
            })
            res.status(201).json({transaction , office})
        } catch (error) {
            next(error)
        }
    }

    static getByToken = async(req,res,next) => {
        let user = req.currentUser
        try {
            let transactions = null
            if(user.subRole.includes('pickuper')) {
                // get office id by user
                let office = await Office.findOne({user: user.id})
                transactions = await Transaction.find({office: office._id})
                                    .populate("user" , "name")
                transactions = transactions.map(transaction => {
                    return {
                        _id: transaction._id,
                        user: transaction.user.name,
                        status: transaction.status
                    }
                })
            } else {
                transactions = await Transaction.find({user: user._id})
                                            .select('status poin createdAt')
            }
            res.status(200).json(transactions)
        } catch (error) {
            next(error)
        }
    }
    
    static createByToken = async (req,res,next) => {
        let user = req.currentUser
        try {
            // get customer id for find office id
            const customer = await Customer.findOne({user: user._id})

            // get office id
            const office = customer.office

            //  create transaction with user and office
            const transaction = await Transaction.create({
                office, user: user._id
            })
            
            res.status(200).json({
                message: "Created transaction successfully",
                transaction,
            })
        } catch (error) {
            next(error)
        }
    }
    
    static countEachStatus = async (req,res,next) => {
        try {
            let {role, subRole , _id} = req.currentUser
            let data= null
            if(role === 'admin') {
                data = {
                    waiting: await Transaction.find({status: "waiting"}).count(),
                    process: await Transaction.find({status: "process"}).count(),
                    done: await Transaction.find({status: "done"}).count(),
                    reject: await Transaction.find({status: "reject"}).count()
                }
            } else {
                if(subRole.includes('pickuper')) {
                    const office = await Office.findOne({ user: _id })
                    data = {
                        waiting: await Transaction.find({ office: office._id , status: "waiting"}).count(),
                        process: await Transaction.find({ office: office._id , status: "process"}).count(),
                        done: await Transaction.find({ office: office._id , status: "done"}).count(),
                    }
                } else {
                    return next({name: "Unauthorize"})
                }
            }
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static getDetail = async(req,res,next) => {
        const {id} = req.params
        try {
            const transaction = await Transaction.findById(id) 
            if(!transaction) return next({name: "NotFound"})
            res.status(200).json(transaction)
        } catch (error) {
            next(error)
        }
    }

    static delete = async(req,res,next) => {
        const {id} = req.params
        try {
            const transaction = await Transaction.findByIdAndDelete(id)
            if(!transaction) return next({name: "NotFound"})
            res.status(200).json({
                message: "Deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    static receiveTransaction = async (req,res,next) => {
        try {
            // get request value
            const {id} = req.params
            const {paper,glass,plastic,iron,cardboard , poin} = req.body

            // update transaction
            const transaction = await Transaction.findByIdAndUpdate(id, {
                rubbish: [
                    {category: 'paper',weight: paper},
                    {category: 'glass',weight: glass},
                    {category: 'plastic',weight: plastic},
                    {category: 'iron',weight: iron},
                    {category: 'cardboard',weight: cardboard},
                ],
                images: req.file.filename,
                status: 'done',
                poin,
            })
            if(!transaction) return next({name: "NotFound"})

            // update user data , increase poin
            const user = await User.findById(transaction.user)
            console.log(user.poin , Number(user.poin) +Number(poin))
            await User.findByIdAndUpdate(user._id , {poin: Number(user.poin) +Number(poin)})
            res.status(200).json({
                message: "Updated successfully",
                transaction
            })
        } catch (error) {
            next(error)
        }
    }

    static updateStatus = async (req,res,next) => {
        const {id} = req.params
        const {status} = req.body
        try {
            let transaction = await Transaction.findByIdAndUpdate(id, {status})
            res.status(200).json({
                message: "Update status successfully",
                transaction,
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TransactionController
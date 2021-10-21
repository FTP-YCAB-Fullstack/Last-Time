const {Schema , model} = require('mongoose')

const RubbishSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['paper' , 'glass' , 'plastic' , 'iron' , 'cardboard']
    },
    weight: {
        type: Number,
        required: true,
    }
})

const TransactionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        office: {
            type: Schema.Types.ObjectId,
            ref: "offices"
        },
        rubbish: [RubbishSchema],
        images: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: "waiting",
            enum: ["waiting" , "process" , "done" , "reject"]
        },
        poin: {
            type: Number,
            default: 0,
        }
    },
    {timestamps: true}
)

module.exports = model('transactions' , TransactionSchema)
const {Schema, model} = require('mongoose')

const CustomerSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        office: {
            type: Schema.Types.ObjectId,
            ref: "offices"
        },
        address: {
            type:String,
            required: true,
        },
        status: {
            type: String,
            default: "waiting",
            enum: ["waiting" , "accepted" , "reject"]
        },
        reason: {
            type: String,
        }
    },
    {timestamps: true}
)

module.exports = model("customers" , CustomerSchema)
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
        status: {
            type: String,
            default: "waiting",
            enum: ["waiting" , "accepted" , "reject"]
        }
    },
    {timestamps: true}
)

module.exports = model("customers" , CustomerSchema)
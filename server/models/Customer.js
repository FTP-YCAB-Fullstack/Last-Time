const {Schema, model} = require('mongoose')

const LocationSchema = new Schema({
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }
})

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
        location: LocationSchema,
        reason: {
            type: String,
        }
    },
    {timestamps: true}
)

module.exports = model("customers" , CustomerSchema)
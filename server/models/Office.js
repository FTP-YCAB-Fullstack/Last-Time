const {Schema , model} = require('mongoose')

const OfficeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users"
        },
        customers: [{type: Schema.Types.ObjectId , ref: "customers"}],
        transactions: [{type: Schema.Types.ObjectId, ref: "transactions" }]
    },
    {timestamps: true}
)

/* OfficeSchema.pre('save' , (next) => {
    console.log('before save office')
    next()
})

OfficeSchema.post('save' , () => {
    console.log('after save office')
})

OfficeSchema.pre('remove' , (next) => {
    console.log('before remove office')
    next()
})

OfficeSchema.post('remove' , (next) => {
    console.log('after remove office')
    next()
}) */



module.exports = model('offices' , OfficeSchema)
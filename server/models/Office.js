const {Schema , model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

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

OfficeSchema.plugin(mongoosePaginate)

/* OfficeSchema.pre('save' , (next) => {
    console.log('before save office')
    next()
})

OfficeSchema.post('save' , () => {
    console.log('after save office')
})

OfficeSchema.pre('remove' , {document: false , query: true} , () => {
    console.log('before remove office')
})

OfficeSchema.post('remove' , {document: false , query: true}  , () => {
    console.log('after remove office')
}) */



module.exports = model('offices' , OfficeSchema)
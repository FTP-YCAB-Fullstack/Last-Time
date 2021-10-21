const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    password: {
      type: String,
    },
    subRole: {
      type: [String],
      default: ["normal"],
      enum: ["pickuper", "contributor" , "normal"]
    },
    poin: {
      type: Number,
      default: 0,
    }
  },  
  { timestamps: true }
)

UserSchema.plugin(mongoosePaginate)

module.exports = model('users', UserSchema)

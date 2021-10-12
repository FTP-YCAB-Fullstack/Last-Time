const { Schema, model } = require('mongoose')

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
      required: true,
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

module.exports = model('users', UserSchema)

// const mongoose = require('mongoose')
// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       enum: ['Cashier', 'Waiter'],
//       required: true,
//       default: 'Cashier',
//     },
//     passwordHash: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// )

// userSchema.pre('save', function (next) {
//   if (this.username) {
//     this.username = this.username.toLowerCase()
//   }
//   next()
// })

// const User = mongoose.model('User', userSchema)

// module.exports = User

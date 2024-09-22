const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const orderSchema = new mongoose.Schema(
  {
    shippingType: {
      type: String,
      enum: ['desk', 'home'],
      required: true,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    fullName: {
      type: String,
    },
    wilaya: {
      type: String,
    },
    phone: {
      type: String,
    },
    total: {
      type: Number,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        size: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
)

orderSchema.plugin(mongoosePaginate)
const Order = mongoose.model('Order', orderSchema)

module.exports = Order

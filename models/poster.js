const mongoose = require('mongoose')

const heroSchema = new mongoose.Schema({
  mainImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
  cardImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
  },
  name: {
    type: String,
    required: true,
  },
})

const posterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mainImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    sideImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    },
    price: {
      type: String,
      required: true,
    },
    heroes: [heroSchema],
    stock: {
      type: Boolean,
      required: true,
    },
    sizes: [
      {
        name: {
          type: String,
          required: true,
        },
        isAvailable: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false, toJSON: { getters: true }, id: false }
)

const Poster = mongoose.model('Poster', posterSchema)

module.exports = Poster

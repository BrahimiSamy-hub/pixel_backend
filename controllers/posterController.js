const Poster = require('../models/poster')

const createPoster = async (req, res) => {
  try {
    const newPoster = new Poster({
      ...req.body,
    })

    const createdPoster = await newPoster.save()

    res.status(200).json(createdPoster)
  } catch (error) {
    console.error('Error creating Poster:', error)
    res
      .status(500)
      .json({ error: 'Error creating Poster', details: error.message })
  }
}

const updatePoster = async (req, res) => {
  try {
    // Find the poster by its ID
    const poster = await Poster.findById(req.params.id)
    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' })
    }

    // Update the poster's details with the new data from the request body
    const updatedPoster = await Poster.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true } // Return the updated document
    )

    res.status(200).json(updatedPoster)
  } catch (error) {
    console.error('Error updating Poster:', error)
    res
      .status(500)
      .json({ error: 'Error updating Poster', details: error.message })
  }
}

const deletePoster = async (req, res) => {
  const posterId = req.params.id
  try {
    const deletedPoster = await Poster.findByIdAndDelete(posterId)

    if (!deletedPoster) {
      return res.status(404).json({ error: 'Poster not found' })
    }

    res.status(200).json({ message: 'Poster deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error deleting Poster', details: error.message })
  }
}

const getPosters = async (req, res) => {
  const query = {}
  if (req.query.category) {
    query.category = req.query.category
  }

  try {
    const posters = await Poster.find(query)
      .sort({ createdAt: -1 })
      .populate('mainImage')
      .populate('category')
      .populate('sideImage')
      .populate({
        path: 'heroes',
        populate: {
          path: 'mainImage cardImage',
          model: 'File',
        },
      })
    res.status(200).json(posters)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching Posters', details: error.message })
  }
}

const getSinglePoster = async (req, res) => {
  const productId = req.params.id
  try {
    const product = await Poster.findById(productId)
      .populate('mainImage')
      .populate('category')
      .populate('sideImage')
      .populate({
        path: 'heroes',
        populate: {
          path: 'mainImage cardImage',
          model: 'File',
        },
      })
    res.status(200).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error getting Product' })
  }
}

module.exports = {
  createPoster,
  updatePoster,
  deletePoster,
  getPosters,
  getSinglePoster,
}

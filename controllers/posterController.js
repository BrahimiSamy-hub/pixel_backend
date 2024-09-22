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
  const posterId = req.params.id
  try {
    const {
      id,
      name,
      href,
      price,
      dimension,
      stock,
      new: isNew,
      sizes,
      heroes,
    } = req.body

    // Process uploaded images
    const images = req.files.map((file) => ({
      imageSrc: `/uploads/${file.filename}`,
      imageAlt: `Image for ${name}`,
    }))

    // Parse sizes and heroes from JSON strings
    const parsedSizes = JSON.parse(sizes)
    const parsedHeroes = JSON.parse(heroes).map((hero, index) => ({
      ...hero,
      imageSrc: images[index + 1]?.imageSrc || hero.imageSrc,
      imageAlt: images[index + 1]?.imageAlt || hero.imageAlt,
    }))

    // Prepare updated data
    const updatedData = {
      name,
      href,
      price,
      dimension,
      stock,
      new: isNew,
      imageSrc: images[0].imageSrc, // Assuming the first image is the main image
      imageAlt: images[0].imageAlt,
      heroes: parsedHeroes,
      sizes: parsedSizes,
    }

    const updatedPoster = await Poster.findByIdAndUpdate(
      posterId,
      updatedData,
      { new: true }
    )

    if (!updatedPoster) {
      return res.status(404).json({ error: 'Poster not found' })
    }

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
  try {
    const posters = await Poster.find({})
      .sort({ createdAt: -1 })
      .populate('mainImage')
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

module.exports = {
  createPoster,
  updatePoster,
  deletePoster,
  getPosters,
}

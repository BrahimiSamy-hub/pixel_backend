const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')
const userJwt = require('../middlewares/userJwt')

router.post('/', categoryController.createCategory)
router.get('/', categoryController.getCategories)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)
module.exports = router

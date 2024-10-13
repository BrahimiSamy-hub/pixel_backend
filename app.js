const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const app = express()
require('dotenv').config()

// Connect to the database
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'Pixel',
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err))

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
)
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('tiny'))

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Define routes

const posterRoutes = require('./routes/posterRoutes')
const fileRoutes = require('./routes/fileRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
// Use Routes

app.use('/posters', posterRoutes)
app.use('/files', fileRoutes)
app.use('/orders', orderRoutes)
app.use('/categories', categoryRoutes)
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message })
})

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

const Order = require('../models/order')
const TelegramBot = require('node-telegram-bot-api')
const token = process.env.TELEGRAM_API
const chatId = '5096403407'
const createOrder = async (req, res) => {
  try {
    const orderData = { ...req.body }
    const newOrder = new Order(orderData)
    const createdOrder = await newOrder.save()

    // Fetch the created order with populated fields if necessary
    const order = await Order.findById(createdOrder._id).populate('orderItems')

    // Prepare message to be sent via Telegram
    let message = `New Order Created:\n`
    message += `----------------------------\n`
    message += `Items:\n`
    order.orderItems.forEach((item) => {
      message += `${item.name} - Size: ${item.size}, Quantity: ${
        item.quantity
      }, Price: ${item.price * item.quantity}DA\n`
    })
    message += `Total: ${order.total}DA\n`
    message += `----------------------------\n`
    message += `Client Info:\n`
    message += `Name: ${order.fullName}\n`
    message += `Wilaya: ${order.wilaya}\n`
    message += `Phone: ${order.phone}\n`
    message += `Shipping Type: ${order.shippingType}\n`
    message += `Shipping Price: ${order.shippingPrice}DA\n`

    if (order.note) {
      message += `Note: ${order.note}\n`
    }

    // Sending the message via Telegram
    const bot = new TelegramBot(token, { polling: false })
    bot
      .sendMessage(chatId, message)
      .then((response) => {
        console.log('Message sent successfully:', response)
      })
      .catch((err) => {
        console.error('Failed to send message via Telegram:', err)
      })

    res.status(201).json(order)
  } catch (error) {
    console.error('Error creating Order:', error)
    res.status(500).json({ error: 'Error creating Order' })
  }
}

const getOrders = async (req, res) => {
  try {
    //set 3 seconds timout to simulate slow network
    await new Promise((resolve) => setTimeout(resolve, 500))
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const status = req.query.status
    const filter = req.query.filter
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      populate: [{ path: 'orderItems.product', select: 'engName' }],
    }
    const query = {}
    if (status) {
      query.status = status
    }
    if (filter) {
      const regex = new RegExp(filter, 'i')
      query.$or = [
        { reference: { $regex: regex } },
        { fullName: { $regex: regex } },
        { wilaya: { $regex: regex } },
        { phoneNumber1: { $regex: regex } },
        { phoneNumber2: { $regex: regex } },
      ]
    }

    const orders = await Order.paginate(query, options)
    res.status(200).json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).send('Error retrieving Orders.')
  }
}

const updateOrder = async (req, res) => {
  //set 3 seconds timout to simulate slow network
  await new Promise((resolve) => setTimeout(resolve, 500))
  const orderId = req.params.id
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    }).populate('orderItems.product')

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: 'Error updating Order' })
  }
}

const sendTelegramMessage = async (req, res) => {
  try {
    const bot = new TelegramBot(token, { polling: false })
    const { message } = req.body
    const chatId = '5096403407' // Your Telegram chat ID

    bot
      .sendMessage(chatId, message)
      .then((response) => {
        console.log('Message sent', response)
        res.status(200).send('Message sent successfully')
      })
      .catch((err) => {
        console.error('Failed to send message', err)
        res.status(500).send('Failed to send message')
      })
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' })
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  sendTelegramMessage,
}

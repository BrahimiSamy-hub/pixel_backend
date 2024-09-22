// const Table = require('../models/table')

// const createTable = async (req, res) => {
//   try {
//     const createdTable = new Table({
//       ...req.body,
//     })

//     const table = await createdTable.save()
//     if (!table) {
//       return res.status(400).json({
//         success: false,
//         message: 'La table ne peut pas être créée',
//       })
//     }
//     res.status(200).json(table)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({
//       success: false,
//       message: 'La table ne peut pas être créée',
//     })
//   }
// }
// const updateTable = async (req, res) => {
//   try {
//     const table = await Table.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     })
//     if (!table) {
//       return res.status(400).json({
//         success: false,
//         message: 'La table ne peut pas être mise à jour',
//       })
//     }
//     res.status(200).json(table)
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'La table ne peut pas être mise à jour',
//     })
//   }
// }

// const deleteTable = async (req, res) => {
//   try {
//     const table = await Table.findByIdAndDelete(req.params.id)
//     if (!table) {
//       return res.status(400).json({
//         success: false,
//         message: 'La table ne peut pas être supprimée',
//       })
//     }
//     res.status(200).json({
//       success: true,
//       message: 'Table supprimée avec succès',
//     })
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'La table ne peut pas être supprimée',
//     })
//   }
// }
// const getTables = async (req, res) => {
//   try {
//     const room = req.query.room
//     if (!room) {
//       return res.status(400).json({
//         success: false,
//         message: 'Veuillez fournir une salle',
//       })
//     }
//     const tables = await Table.find({ room: room }).sort({ createdAt: 1 })
//     res.status(200).json(tables)
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Les tables ne peuvent pas être récupérées',
//     })
//   }
// }

// module.exports = {
//   createTable,
//   updateTable,
//   deleteTable,
//   getTables,
// }

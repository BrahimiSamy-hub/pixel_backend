// const Room = require("../models/room");

// const createRoom = async (req, res) => {
//   try {
//     const createdRoom = new Room({
//       ...req.body,
//     });

//     const room = await createdRoom.save();
//     if (!room) {
//       return res.status(400).json({
//         success: false,
//         message: "La salle ne peut pas être créée",
//       });
//     }
//     res.status(200).json(room);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "La salle ne peut pas être créée",
//     });
//   }
// };
// const updateRoom = async (req, res) => {
//   try {
//     const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!room) {
//       return res.status(400).json({
//         success: false,
//         message: "La salle ne peut pas être mise à jour",
//       });
//     }
//     res.status(200).json(room);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "La salle ne peut pas être mise à jour",
//     });
//   }
// };

// const deleteRoom = async (req, res) => {
//   try {
//     const room = await Room.findByIdAndDelete(req.params.id);
//     if (!room) {
//       return res.status(400).json({
//         success: false,
//         message: "La salle ne peut pas être supprimée",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       message: "Salle supprimée avec succès",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "La salle ne peut pas être supprimée",
//     });
//   }
// };
// const getRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find().sort({ createdAt: 1 });
//     res.status(200).json(rooms);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Les salles ne peuvent pas être récupérées",
//     });
//   }
// };

// module.exports = {
//   createRoom,
//   updateRoom,
//   deleteRoom,
//   getRooms,
// };

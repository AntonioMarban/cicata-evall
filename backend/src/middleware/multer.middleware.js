const multer = require('multer');
const { uploadDocuments } = require('../controllers/researcher.controller');
const storage = multer.memoryStorage() //esto es para almacenar temporalemnte los archivos en la RAM como buffers, y tal vez te preguntes que es un buffer?, no se
const upload = multer({ storage }).array('documents'); //nombre del input para el frontend (Gordinho13)

module.exports = upload

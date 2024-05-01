const multer = require('multer');
const path = require('path');

// Destino de las imágenes
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, "carImage-"+Date.now() + path.extname(file.originalname)); // Agrega la extensión del archivo
    },
    // Filtro para aceptar solo imágenes
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/; // Extenciones permitidas
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Archivo debe ser una imagen válida");
    },
    // Limite de tamaño de la imagen
    limits: { fileSize: 10000000 } // 10MB
});

// Si no existe la carpeta la crea
const checkFolder = () => {
    const fs = require('fs');
    const dir = './uploads';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
}
checkFolder();

// Middleware para subir la imagen
const upload = multer({ storage: storage });

module.exports = upload;
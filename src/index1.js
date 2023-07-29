const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Datos simulados en memoria
const products = [
    { id: 1, name: 'Producto 1', category: 'Electrónica', images: ['image1.jpg'] },
    { id: 2, name: 'Producto 2', category: 'Ropa', images: ['image2.jpg'] },
    // Agregar más productos aquí
];

app.use(bodyParser.json());

// Ruta para búsqueda avanzada
app.get('/search', (req, res) => {
    // ... (código de búsqueda previo)
});

// Ruta para agregar imágenes a un producto
app.post('/add-image/:productId', upload.array('images', 5), (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
            product.images.push(file.filename);
        });
        return res.json({ message: 'Imágenes agregadas con éxito' });
    }

    return res.status(400).json({ message: 'No se encontraron imágenes para cargar' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

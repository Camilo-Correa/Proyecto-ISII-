const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Datos simulados en memoria
const products = [
    { id: 1, name: 'Producto 1', category: 'Electrónica' },
    { id: 2, name: 'Producto 2', category: 'Ropa' },
    // Agregar más productos aquí
];

app.use(bodyParser.json());

// Ruta para búsqueda avanzada
app.get('/search', (req, res) => {
    const { category, keyword } = req.query;
    let results = products;

    if (category) {
        results = results.filter(product => product.category === category);
    }

    if (keyword) {
        results = results.filter(product =>
            product.name.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    res.json(results);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

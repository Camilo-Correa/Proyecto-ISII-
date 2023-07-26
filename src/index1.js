const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Datos simulados en memoria (reemplaza esto con una base de datos en un entorno real)
const users = [];

app.use(bodyParser.json());

// Ruta para el registro de usuarios
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Verifica si el usuario ya existe
    if (users.some(user => user.username === username)) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Agrega al nuevo usuario
    users.push({ username, email, password });

    res.json({ message: 'Registro exitoso' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'barbie', //Aqui debes insertar el nombre del usuario al cual le diste privilegios en la base de datos
    password: '1234', //Aqui pones la contraseña de ese usuario
    database: 'monitoreo_especies'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

app.post('/enviar-reporte', (req, res) => {
    const { especie_id, ubicacion, fecha, cedula, nombre, email } = req.body;

    // Insertar el usuario si no existe
    const usuarioQuery = `INSERT INTO usuario (cedula, nombre, email) VALUES (?, ?, ?)
                          ON DUPLICATE KEY UPDATE nombre = VALUES(nombre), email = VALUES(email)`;
    db.query(usuarioQuery, [cedula, nombre, email], (err) => {
        if (err) {
            console.error(err);
            return res.json({ success: false });
        }

        // Insertar el avistamiento
        const avistamientoQuery = 'INSERT INTO avistamiento (fecha, ubicacion, especie_id, usuario_cedula) VALUES (?, ?, ?, ?)';
        db.query(avistamientoQuery, [fecha, ubicacion, especie_id, cedula], (err) => {
            if (err) {
                console.error(err);
                res.json({ success: false });
                return;
            }
            res.json({ success: true });
        });
    });
});

// Ruta para obtener los avistamientos registrados
app.get('/obtener-avistamientos', (req, res) => {
    const query = `
        SELECT avistamiento.id, especie.nombre_comun, avistamiento.ubicacion, avistamiento.fecha
        FROM avistamiento
        JOIN especie ON avistamiento.especie_id = especie.id
        ORDER BY avistamiento.fecha DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los avistamientos:', err);
            return res.json({ success: false });
        }
        
        console.log('Resultados de avistamientos:', results);  // Agrega este log para verificar resultados
        res.json({ success: true, avistamientos: results });
    });
});



app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

// src/pages/api/server.mjs
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para manejar la solicitud POST
app.post('/api-request', (req, res) => {
    const { PluginName, ServiceName, ServiceAction, BodyData, DataContext } = req.body;

    // Ruta al archivo JSON
    const filePath = path.resolve('./db.json');

    // Leer el archivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el archivo JSON' });
        }

        // Convertir el archivo JSON a un objeto
        const jsonData = JSON.parse(data);

        // Suponiendo que los datos solicitados están en `jsonData.indicadores`
        res.json(jsonData);
    });
});


// Ruta para probar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando. Usa /api-request para obtener datos.');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log('Presiona Ctrl+C para terminar el servidor 🦝');
});
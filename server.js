import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to get the GeoIP data
app.get('/geoip', async (req, res) => {
    try {
        const response = await fetch("https://json.geoiplookup.io/");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching geo data:", error);
        res.status(500).send("Error fetching geo data");
    }
});

// Serve the HTML file when accessing the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

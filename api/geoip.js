import fetch from 'node-fetch';

export default async function handler(req, res) {
    try {
        const response = await fetch("https://json.geoiplookup.io/");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching geo data:", error);
        res.status(500).send("Error fetching geo data");
    }
}

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const vision = require('@google-cloud/vision');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
const { promisify } = require('util');

const visionClient = new vision.ImageAnnotatorClient({
    keyFilename: path.join(__dirname, 'service-account-key.json') // Ensure this path is correct
});


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// const visionClient = new vision.ImageAnnotatorClient({
//     keyFilename: path.join(__dirname, 'path-to-your-service-account-key.json')
// });

const upload = multer({ dest: 'uploads/' });

const waterFootprintData = {
    'apple': 70,
    'banana': 160,
    'beef': 15400,
    'chicken': 4325
};

app.post('/calculate', (req, res) => {
    const item = req.body.item;
    const waterFootprint = waterFootprintData[item.toLowerCase()];

    if (waterFootprint) {
        res.json({ message: `The water footprint of ${item} is ${waterFootprint} liters.` });
    } else {
        res.json({ message: 'Item not found. Please try another item.' });
    }
});

app.post('/scan', upload.single('image'), async (req, res) => {
    try {
        const [result] = await visionClient.labelDetection(req.file.path);
        const labels = result.labelAnnotations;

        if (labels.length > 0) {
            const recognizedItem = labels[0].description.toLowerCase();
            const waterFootprint = waterFootprintData[recognizedItem];

            if (waterFootprint) {
                res.json({ message: `Recognized item: ${recognizedItem}. The water footprint is ${waterFootprint} liters.` });
            } else {
                res.json({ message: `Recognized item: ${recognizedItem}. Water footprint data not found.` });
            }
        } else {
            res.json({ message: 'No recognizable items found in the image.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing the image. Please try again.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

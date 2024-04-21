import Destination from '../models/Destination.js';
import { convertImgToBase64 } from '../utils/imageHandler.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';


// Create destination
export const createDestination = async (req, res) => {
    try {
        const destination = new Destination(req.body);
        await destination.save();
        res.status(201).send(destination);
    } catch (error) {
        res.status(400).send({ error: 'Invalid request data' });
    }
};

// Get all destinations
export const getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find({});
        res.send(destinations);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Get a single destination
export const getSingleDestination = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send();
        }
        res.send(destination);
    } catch (error) {
        res.status(500).send();
    }
}

// Update destination
export const updateDestination = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'country', 'address', 'description', 'types', 'summary'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!destination) {
            return res.status(404).send();
        }
        res.send(destination);
    } catch (error) {
        res.status(400).send(error + '\n Cannot update destination');
    }
}

// Delete destination
export const deleteDestination = async (req, res) => {
    try {
        const destination = await Destination.findByIdAndDelete(req.params.id);
        if (!destination) {
            return res.status(404).send();
        }
        res.send(destination);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Delete all destinations
export const deleteAllDestinations = async (req, res) => {
    try {
        await Destination.deleteMany({});
        res.send({ message: 'All destinations deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update destination places
export const updateDestinationPlaces = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send();
        }
        destination.places = req.body;
        await destination.save();
        res.send(destination);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update destination transportation
export const updateDestinationTransportation = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send();
        }
        destination.transportation = req.body;
        await destination.save();
        res.send(destination);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update destination reviews
export const updateDestinationReviews = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            return res.status(404).send();
        }
        destination.reviews = req.body;
        await destination.save();
        res.send(destination);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Update destination images
export const updateDestinationImages = async (req, res) => {
    try {
        console.log('Starting updateDestinationImages');
    
        const destination = await Destination.findById(req.params.id);
        if (!destination) {
            console.log('Destination not found');
            return res.status(404).send();
        }
    
        const { folderName } = req.body;
        console.log('Folder name:', folderName);

        // Get the directory of the current module
        const dirname = path.dirname(fileURLToPath(import.meta.url));
    
        // Get all image files from the specified folder
        const imageDir = path.join(dirname, `../../frontend/src/assets/destination_images/${folderName}`);
        console.log('Image directory:', imageDir);
    
        const imageFiles = fs.readdirSync(imageDir).filter(file => file.endsWith('.png') || file.endsWith('.jpg'));
        console.log('Image files:', imageFiles);
    
        // Convert the images to base64 and replace the existing images
        const imageBase64s = await Promise.all(imageFiles.map(async file => {
            const filePath = path.join(imageDir, file);
            const base64 = await convertImgToBase64(filePath);
            return base64;
        }));
    
        console.log('Converted images to base64');
    
        destination.images = imageBase64s;
    
        await destination.save();
        console.log('Saved destination');
    
        res.send(destination);
    } catch (error) {
        console.log('Error:', error);
        res.status(400).send(error);
    }
}
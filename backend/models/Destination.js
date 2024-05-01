import mongoose from "mongoose";
import dotenv from 'dotenv'

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video:{
        type: String,
        default: ''
    },
    images: {
        type: [],
        default: []
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    places: {
        type: Object,
        default: { _dummy: null }
    },
    transportation: {
        type: Object,
        default: { _dummy: null }
    },
    types: {
        type: [String],
        default: []
    },
    reviews: {
        type: Object,
        default: { _dummy: null }
    },
    summary: {
        type: String,
        default: ''
    }
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
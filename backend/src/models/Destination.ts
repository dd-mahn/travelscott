import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video:{
        type: String,
        default: '',
    },
    images: {
        type: [],
        default: [],
    },
    country: {
        type: String,
        default: ""
    },
    continent: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    places: {
        type: Object,
        default: { _dummy: null },
    },
    transportation: {
        type: Object,
        default: { _dummy: null },
    },
    tags: {
        type: [String],
        default: [],
        enum: ["Wilderness", "Culture&Heritage", "Food&Drink", "SoloJourneys", "CityScape", "Season&Festival", "Relaxation", "FirstTimeAbroad"]
    },
    insight: {
        type: Object,
        default: { _dummy: null },
    },
    summary: {
        type: String,
        default: '',
    },
    featured: {
        type: Boolean,
        default: false,
    }
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;
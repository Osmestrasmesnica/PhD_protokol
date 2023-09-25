const mongoose = require('mongoose');

// Define a schema for the "MyCollection" collection
const myCollectionSchema = new mongoose.Schema({
    fsNumber: String,
    date: Date,
    location: String,
    sublocation1: String,
    sublocation2: String,
    participants: String,
    lighting: String,
    threatFactor: String,
    note: String,
    fsSize: Number,
    latitude: Number,
    longitude: Number,
    altitude: Number,
    exposure: String,
    slope: String,
    habitat: String,
    taxa: [
        {
            name: String,
            b: Number,
            p: Number,
            s: String,
        },
    ],
});

// Create a model for the "MyCollection" collection
const MyModel = mongoose.model('MyCollection', myCollectionSchema, "nameofcollection");

// Export the model for use in your application
module.exports = MyModel;


const mongoose=require('mongoose');
const placeschema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String], // Ensure it's an array
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price:Number,
});


const placeModel=mongoose.model('place',placeschema);


module.exports=placeModel;
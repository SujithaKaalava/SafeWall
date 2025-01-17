// import React from 'react' 

const mongoose=require('mongoose');
const bookingSchema=mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'place'},
    user:{type:mongoose.Schema.Types.ObjectId,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    name:{type:String,required:true},
    phone:{type:String,required:true},
    price:{type:Number,required:true},
    


})

const BookingModel=mongoose.model('Bookings',bookingSchema)

module.exports=BookingModel;
const cors = require('cors'); // Importing CORS middleware
const express = require('express'); // Importing Express framework
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express(); // Creating an Express application
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer=require('multer')
const fs=require('fs')
const Place=require('./models/Place')
const Booking=require('../api/models/Booking')


const imageDownloader=require('image-downloader')

const cookieParser = require('cookie-parser');

app.use(cookieParser()); // Add this middleware to parse cookies


app.use('/Uploads',express.static(__dirname+'/Uploads'));

require('dotenv').config(); // Ensure dotenv is loaded first

app.use(express.json());

// Enabling CORS with credentials and proper origin
app.use(cors({
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    origin: 'http://localhost:5173', // Specify the base origin (not a specific route)
}));

// MongoDB Connection String
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://bookingApp:fUmtrJ6PgIREbAGz@cluster0.mqk3b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Connection
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true,
    tlsInsecure: false, // Ensures secure TLS
}).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB: ', err);
});

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        const { token } = req.cookies; // Extract token from cookies
        if (!token) {
            return reject(new Error('No token found'));
        }
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
            if (err) return reject(err);
            resolve(userData);
        });
    });
}

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});

// Test Route
app.get('/test', (req, res) => {
    res.json('test ok');
});

// Register Route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const saltRounds = 10; // A common value for bcrypt's salt rounds
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.json(userDoc);
    } catch (e) {
        res.status(442).json(e);
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Received login request for email:', email);

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', userDoc);

        const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid password' });
        }

        console.log('Password valid, signing JWT');
        const token = jwt.sign(
            { email: userDoc.email,
                id: userDoc._id,

                },
            process.env.JWT_SECRET, // Ensure the secret is loaded from .env
            { expiresIn: '6d' }
        );

        console.log('JWT token generated:', token);

        // Conditionally set the 'secure' flag for cookies based on the environment
        const isProduction = process.env.NODE_ENV === 'production';
        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: isProduction,  // Set secure flag only in production
                sameSite: 'strict',    // Prevent CSRF attacks
            })
            .json(userDoc);

    } catch (err) {
        console.error('Error during login:', err); // Log full error details
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    console.log("Token received in cookies:", token);  // Log token for debugging

    if (!token) {
        return res.status(401).json({ error: 'No token found' });
    }

    try {
        // Verify and decode the token
        const userData = jwt.verify(token, process.env.JWT_SECRET,{},async (err,userData)=>{
            if(err) throw err;
            const {name,email,id}=await User.findById(userData.id)
            res.json({name,email,id});
        });
        console.log("Decoded user data:", userData);  // Log decoded user data

        // res.json(userData);  // Send decoded user data back to the frontend
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(403).json({ error: 'Invalid token', message: err.message });
    }
});

//logout 

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})


app.post('/upload-by-link',async (req,res)=>{
    const {link}=req.body
    const newName='photo'+Date.now()+'.jpg'
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/Uploads/'+newName
    })

    res.json(newName)

})

const photosMiddleware=multer({dest:'Uploads/'})

app.post('/Upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace(/\\/g, '/').replace('Uploads/', '')); // Normalize path
    }
    res.json(uploadedFiles);
});



app.post('/places', async (req, res) => {
    const { token } = req.cookies;
    const { title, address,addedphotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price } = req.body;
    
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const userData = jwt.verify(token, process.env.JWT_SECRET);
            const placeDoc = await Place.create({
                owner: userData.id,
                title,
                address,
                photos:addedphotos, // Map frontend field to backend schema
                description,
                perks,
                extraInfo: extraInfo, // Map frontend field to backend schema
                checkIn: checkIn,     // Map frontend field to backend schema
                checkOut: checkOut,   // Map frontend field to backend schema
                maxGuests: maxGuests,// Map frontend field to backend schema
                price,
            });

            res.json(placeDoc); // Respond with the created place
        } catch (err) {
            console.error('Error creating place:', err);
            res.status(500).json({ message: 'Error creating place', error: err.message });
        }
    });
});


app.get('/user-places',(req,res)=>{
    const { token } = req.cookies;
    
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        const {id}=userData;
        res.json(await Place.find({owner:id}))
    })

})

app.get('/places/:id',async (req,res)=>{
const {id}=req.params;
res.json(await Place.findById(id));
})

app.put('/places',async (req,res)=>{
    
    const { token } = req.cookies;
    const { id,title, address,addedphotos,
         description, perks, extraInfo, checkIn,
          checkOut, maxGuests,price } = req.body;

   
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
        if(err) throw err;
    
    const placeDoc=await Place.findById(id)
    // console.log(userData.id)
    // console.log(placeDoc.owner)
    if(userData.id===placeDoc.owner.toString()){
        placeDoc.set({
           
                title,
                address,
                photos:addedphotos, // Map frontend field to backend schema
                description,
                perks,
                extraInfo: extraInfo, // Map frontend field to backend schema
                checkIn: checkIn,     // Map frontend field to backend schema
                checkOut: checkOut,   // Map frontend field to backend schema
                maxGuests: maxGuests,
                price,
        });
        console.log(userData.id)
        await placeDoc.save();
        res.json('ok')
    }
    
    })
})

app.get('/places',async (req,res)=>{
    res.json(await Place.find());
})

app.post('/bookings',async (req,res)=>{
    const userData=await getUserDataFromReq(req)
    const {place,checkIn,checkOut
        ,noOfGuests,name,phone,price}=req.body;
        
        await Booking.create({
            place,checkIn,checkOut
        ,noOfGuests,name,phone,price,
        user:userData.id,
        }).then((doc)=>{
            
            res.json(doc);
        }).catch((err)=>{
            throw err
        })

});


// app.get('/bookings',async (req,res)=>{
//     const { token } = req.cookies;
//     const userData=await getUserDataFromReq(req);
//     res.json(await Booking.find({user:userData.id}.populate('place')))

// })

app.get('/bookings', async (req, res) => {
    try {
        const { token } = req.cookies;
        const userData = await getUserDataFromReq(req);

        // Use populate to fetch related 'place' details
        const bookings = await Booking.find({ user: userData.id }).populate('place');
        

        res.json(bookings);
    } catch (err) {
        console.error('Error fetching bookings:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Start the Server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

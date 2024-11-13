const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Booking = require('./models/Booking');
require('dotenv').config();
const disElectricianRouter = require('./routes/dis_electrician'); 
const disPlumberRouter=require('./routes/dis_plumber')
const disMaidRouter=require('./routes/dis_maid')
const disNannyRouter=require('./routes/dis_nanny')
const disSecurityRouter = require('./routes/dis_security'); 
const disPainterRouter=require('./routes/dis_painter')
const disCookRouter=require('./routes/dis_cook')

const disCarpenterRouter=require('./routes/dis_carpenter')
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Handymanny', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Import routes from the 'routes' directory
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const loginRoutes = require('./routes/login');
const serviceproviderRoutes = require('./routes/service_provider');
// Use the routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/booking', bookingRoutes);
app.use('/service-provider', disElectricianRouter);
app.use('/service-provider', disPlumberRouter);
app.use('/service-provider', disNannyRouter);
app.use('/service-provider', disMaidRouter);
app.use('/service-provider', disSecurityRouter);
app.use('/service-provider', disPainterRouter);
app.use('/service-provider', disCookRouter);
app.use('/service-provider', disCarpenterRouter);
app.use('/api', serviceproviderRoutes);
app.use('/login', loginRoutes);
// Serve HTML files for specific routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/booking', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

app.get('/myorder', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'myorder.html'));
});

app.get('/serviceprovider', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'service_provider.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'search.html'));
});

app.get('/service-provider/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'service_provider_login.html'));
});

app.get('/views/:page', (req, res) => {
    const { page } = req.params;
    const filepath = path.join(__dirname, 'views', page);
    res.sendFile(filepath);
});

// Route to handle booking with date and time
app.get('/api/booking/create', (req, res) => {
    const { date, time } = req.query;


    app.post('/booking/create', async (req, res) => {
        const {
            userId,
            serviceProviderId,
            serviceProviderName,
            serviceProviderNumber,
            userName,
            userAddress,
            date,
            timeSlot
        } = req.body;
    
        // Check if required fields are provided
        if (!userId || !serviceProviderId || !date || !timeSlot) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
    
        try {
            const newBooking = new Booking({
                userId,
                serviceProviderId,
                serviceProviderName,
                serviceProviderNumber,
                userName,
                userAddress,
                date,
                timeSlot,
                status: 'Pending',
            });
            const savedBooking = await newBooking.save();
            res.status(201).json({ orderId: savedBooking._id });
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ error: error.message });
        }
    });    
    // Check if date and time are provided
    if (!date || !time) {
        return res.status(400).json({ message: 'Missing required fields: date or time' });
    }

    // Process the booking logic here (for now, just send back the received data)
    res.json({ message: 'Booking successful', date, time });
});



// Handle 404 errors for non-existent routes
app.use((req, res, next) => {
    console.log(`404 error - Path requested: ${req.path}`);
    res.status(404).send('Sorry, page not found');
    res.json({ message: 'Booking successful', date, time });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
console.log(JWT_SECRET);
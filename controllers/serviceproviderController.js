const ServiceProvider = require('../models/ServiceProvider');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// JWT secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'b9a599072c519716cb27d545274733089d6974cac860528d66b74923598644694e73d339eac6e165ee3525145f8dafb2a29784d9c615cf163a043781def63843';

// Handle service provider registration
exports.register = async (req, res) => {
    const { name, email, phoneNumber, address, services, password, profession } = req.body;

    try {
        // Check if email already exists
        const existingProvider = await ServiceProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle file upload (document)
        const document = req.file ? req.file.path : null;

        // Create new service provider
        const serviceProvider = new ServiceProvider({
            name,
            email,
            phoneNumber,
            address,
            services: services.split(','),  // Assuming services are sent as a comma-separated string
            document,
            password: hashedPassword,
            profession
        });

        // Save service provider to database
        await serviceProvider.save();

        // Create a JWT token for the registered service provider
        const token = jwt.sign({ id: serviceProvider._id, email: serviceProvider.email }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with success and token
        res.status(201).json({ 
            message: 'Service provider registered successfully', 
            token, 
            serviceProvider: { name: serviceProvider.name, email: serviceProvider.email }
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Handle service provider login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find service provider by email
        const serviceProvider = await ServiceProvider.findOne({ email });
        if (!serviceProvider) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, serviceProvider.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Create a JWT token upon successful login
        const token = jwt.sign({ id: serviceProvider._id, email: serviceProvider.email }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and user info
        res.status(200).json({ 
            message: 'Login successful', 
            token, 
            serviceProvider: { name: serviceProvider.name, email: serviceProvider.email }
        });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

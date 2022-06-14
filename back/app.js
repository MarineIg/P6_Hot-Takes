// Importations
const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// Pour créer l'application express
const app = express();

// Importation du fichier db
const mongoose = require('./db/bdd');

// Importation des différentes routes (user et sauce)
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(helmet());
app.use(cors());
app.use(limiter);

// Analyse le corps de la requête
app.use(express.json());

// Résolution des problèmes CROS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});


// Route pour accéder aux images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route d'authentification
app.use('/api/auth', userRoutes);

// Route global sauces
app.use('/api/sauces', sauceRoutes);

// Exportation de app.js
module.exports = app;

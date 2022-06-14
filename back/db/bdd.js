// Importation
const dotenv = require("dotenv");
dotenv.config();

// Importation du module mongoose
const mongoose = require('mongoose');

// Connexion à mongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Exportation de db.js
module.exports = mongoose;
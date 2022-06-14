// Importation
const passwordValidator = require('password-validator');

// Création du schéma
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)
.is().max(30)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123', 'Passw0rd123']) 

module.exports = passwordSchema;

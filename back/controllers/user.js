const bcrypt = require('bcrypt');
const cryptojs = require('crypto-js');


const jwt = require('jsonwebtoken');

const dotenv = require("dotenv");
dotenv.config();

// Importation du models user
const User = require('../models/User');

const passwordValidator = require('../middleware/passwordValidator');


exports.signup = (req, res, next) => {   
  const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString();  
  if (!passwordValidator.validate(req.body.password)) {
    return res.status(400).json({message: 'Mot de passe invalide !'});
  } else {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: emailCryptoJS,
          password: hash
        });          
        user.save()
          .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
          .catch((error) => res.status(400).json({error}));
      })
      .catch((error) => res.status(500).json({error}));
  }
};

exports.login = (req, res, next) => {
  const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, process.env.CRYPTOJS_EMAIL).toString();  
  User.findOne({email: emailCryptoJS})
    .then(user => {
      if(!user) {
        return res.status(401).json({message: 'Utilisateur non trouvé !'});
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if(!valid) {
            return res.status(401).json({message: 'Mot de passe incorrect'});
          }  
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {userId: user._id},
              process.env.TOKEN_KEY,
              {expiresIn: '24h'}
            )            
          });
        })
        .catch((error) => res.status(500).json({error}));
    })
    .catch((error) => res.status(500).json({error}));
};
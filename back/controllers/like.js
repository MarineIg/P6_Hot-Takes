const Sauce = require('../models/Sauce');

exports.likeDislikeSauce = (req, res, next) => {
    Sauce.findOne({_id:req.params.id})
        .then((sauce) => {
            switch (req.body.like) {
                // Ajoute +1 au like
                case 1:
                    if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                        Sauce.updateOne(
                            {_id: req.params.id}, 
                            {
                                $inc: {likes: 1},
                                $push: {usersLiked: req.body.userId}
                            },
                        )                    
                        .then(() => res.status(201).json({message: "like +1 ajouté"}))
                        .catch((error) => res.status(400).json({error}));
                    }
                    break;

                // Like et dislike sont remis à zero
                case 0:
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            {_id: req.params.id}, 
                            {
                                $inc: {likes: -1},
                                $pull: {usersLiked: req.body.userId}
                            },
                        )                    
                        .then(() => res.status(201).json({message: "like à 0"}))
                        .catch((error) => res.status(400).json({error}));
                    }

                    if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            {_id: req.params.id}, 
                            {
                                $inc: {dislikes: -1},
                                $pull:{usersDisliked: req.body.userId}
                            },
                        )                    
                        .then(() => res.status(201).json({message: "dislike à 0"}))
                        .catch((error) => res.status(400).json({error}));
                    }                                       
                    break;
                
                // Ajoute +1 au dislike
                case -1:
                    if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                        Sauce.updateOne(
                            {_id: req.params.id}, 
                            {
                                $inc: {dislikes: 1},
                                $push: {usersDisliked: req.body.userId}
                            },
                        )                    
                        .then(() => res.status(201).json({message: "Dislike +1 ajouté"}))
                        .catch((error) => res.status(400).json({error}));
                    }                    
                    break;
            }
        })
        .catch((error) => res.status(404).json({error}));
};
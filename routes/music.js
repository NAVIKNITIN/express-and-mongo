let express = require("express");
let router = express.Router();
let Genre = require("../schema/genre.schema");
let Music = require("../schema/music.schema");
let joi = require("joi");
 
router.post("/music",async(req,res)=>{
    let {error}=ValidationError(req.body);
    if (error){return res.status(400).send(error.details[0].message)}
    let genre = await Genre.Genremodel.findById(req.body.genreid)
    if(!genre){return res.status(403).send({message:"Invalid genre id "})}
    let newmusic = new Music.Musicmodel({
        name:req.body.name,
        price:req.body.price,
        genre:{
            _id: genre._id,
            name:genre.name
        },
        author:req.body.author,
        stocks:req.body.stocks
    });
    let music = await newmusic.save();

    res.send({message:"stored the music data",m:music});

});


function  ValidationError(error) {
    let schema = joi.object({
        name:joi.string().required(),
        author:joi.string().required(),
        genreid:joi.string().required()
    });
    return schema.validate(error);

};

module.exports = router;

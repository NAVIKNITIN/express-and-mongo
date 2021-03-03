let express = require("express");
let router = express.Router();
let Joi = require('joi');
let Music = require("../schema/music.schema");
let Customer = require("../schema/customer.schema");

router
.get('/customer', async(req,res)=> {
    res.status(200).json({
        message: "It is working properly"
    });
    res.status(404).json({
        message: "It is not working properly"
    })
})
.post('/customer', async(req,res)=>{
    let {error} = Validationerror(req.body);
    if (error){return res.status(400).send(error.details[0].message)};
    let music = await Music.Musicmodel.findById(req.body.musicid);
    if(!music){return res.status(403).send({message:"invalid music id"})};
    let newcustomer = new Customer({
        username:req.body.username,
        phone:req.body.phone,
        music:{
            name:music.name,
            price:music.price,
            author:music.author,
            genre:music.genre,
            stocks:music.stocks
        },
        price : req.body.price,
    
    });
    let customer=await newcustomer.save();
    music.stocks--;
    await music.save();
    res.send({c:customer});
});



function Validationerror(error) {
    let schema = Joi.object({
        username:Joi.string().required(),
        phone : Joi.string().required(),
        musicid:Joi.string().required()
    });
    return schema.validate(error);
};

module.exports = router;



let express=require('express');
let router=express.Router();
let joi = require("joi");
router.use(express.json());
let musiclist = [{
    id:1,
    name:"faded"

},{
    id:2,
    name:"alone"
},{
    id:3,
    name:"something just like this"
},
{
    id:4,
    name:"lag ja gale"
},{
    id:5,
    name:"iktara"
}];

router.get("/musiclist/:id",(req,res)=>{
    res.send(req.params.id);
});

router.get("/musiclist",(req,res)=>{
    res.send(musiclist);
});

router.get("/musiclist/:id",(req,res)=>{
    // if id not match then return a bad request
    let list = musiclist.find((data)=>data.id === parseInt(req.params.id));
    if(!list){return res.status(404).send({message:"invalid id"})};
    // if id get's match send course
    res.send(list)
});


// router.get("/musiclist/:id",(req,res)=>{
//     res.send(req.params.id);
// });

// CRUD Operations -->Create -->Read -> Update -->Delete
// create--post()
// read -- get()
// update -- put()
// delete -- Delete()

// router.get("/course",(req,res)=>{
//     res.send("hello user!!!");

// });

// create a music list
router.post("/createmusic",(req,res)=>{
    let schema = joi.object({
        name:joi.string().min(3).required() //validation methods

    });

    let result = schema.validate(req.body);
    // console.log(result);
    if (result.error){return res.status(400).send(result.error.details[0].message)};

    let list = {
        id : musiclist.length + 1 ,
        name:req.body.name
    };
   
    musiclist.push(list);
    res.send(musiclist);
});

router.put("/updatemusic/:id",(req,res)=>{
    let music = musiclist.find((item)=>item.id === parseInt(req.params.id));
    if(!music) {return res.status(404).send({message:"invalid music id"})}
    music.name = req.body.name;
    res.send({message:"music is updated",music :music})
});


router.delete("/deletemusic/:id",(req,res)=>{
    let music = musiclist.find((item)=>item.id ===parseInt(req.params.id));
    if(!music){return res.status(404).send({message:"invalid music id"})}
    let musicid=musiclist.indexOf(music);
    let deletemusic=musiclist.splice(musicid,1);


    res.send({message:"deleted sucessfully"})
});

module.exports=router;
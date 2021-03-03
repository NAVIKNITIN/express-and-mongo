let mongoose = require('mongoose'); 
let Genre = require("../schema/genre.schema")
let musicschema = mongoose.Schema({
    name:{type:String , trim:true , required:true},
    price:{type:String , trim:true , required:true},
    genre:{type : Genre.genreschema,required:true},
    stocks:{type:String , trim:true}
});

let Musicmodel = mongoose.model("music",musicschema);

module.exports={
    musicschema,
    Musicmodel
};
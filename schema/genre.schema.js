let mongoose = require('mongoose');

let genreschema = mongoose.Schema({
    name:{type:String , trim:true , required:true}
});

let Genremodel = mongoose.model("genre",genreschema);

module.exports={
    genreschema,
    Genremodel
};
let mongoose = require('mongoose');
let Music = require("../schema/music.schema");

let schema = mongoose.Schema({
    username:{type:String, required :true},
    phone :{type:String},
    music :{type:Music.musicschema},
    price: {type: Number, required :true}

});
let CustomerModel = mongoose.model("customer",schema);

module.exports = CustomerModel;

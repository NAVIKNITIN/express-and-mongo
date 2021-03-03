// custom middleware
function Working(req,res,next) {
        console.log("first");
        next();   
};
module.exports = Working;
const expressJWT = require('express-jwt');
require('dotenv').config();

exports.rerquireSign_In = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms:["HS256"],
    userProperty: 'data'
});
exports.isData =  function (request, response, session)  {

    let user = request.affiche && request.data && (request.affiche._id == request.data._id )
    if(!user) {
        return response.status(403).json({
            erreur:" manque la permission"
        })
    }
    session()
}
exports.adminstration =  function (request, response, session )  {
    if(request.data.role == 0 ) {
        return response.status(403).json({
            erreur: "Manque la permission d adminstrateur"
        })
    }
    session();
}

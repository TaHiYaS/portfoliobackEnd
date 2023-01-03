
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.hello =  function (request,response)  {
    response.send('Bienvenue')
}

exports.sign_up = function (request , response)  {
    
    const user = new User(request.body)
    user.save(function (erreur, user)  {
        if(erreur) {
            return response.status(400).send(erreur)
        }
        user.hashed_password = undefined
        user.salt = undefined
        response.send(user)
    })
}

exports.sign_in = function (request , response)  {
    const email= request .body.email;
    const password = request .body.password;

    User.findOne({email : email},function (erreur, user) {
        if(erreur || !user) {
            return response.status(400).json({
                erreur :'email n existe pas'
            })
        }
        if(!user.authenticate(password)) {
            return response.status(401).json({
                erreur :'erreur password et email '
            })
        }
        const token =  jwt.sign({_id: user._id, role: user.role},process.env.JWT_SECRET );
        response.cookie('session', token, {expire: new Date() + 8000000})
        const _id =user._id;
        const name= user.name;
        const email = user.email;
        const role = user.role;
        return response.json({ token, user:{_id: _id,name : name,email : email,role :role} })
    }) 
}

exports.sign_out = function (request ,response) {
    response.clearCookie('session');
    response.json({msg:"deconnecter" })
}
exports.afficherUser =  function (request, response) {

    request.affiche.hashed_password = undefined
    request.affiche.salt = undefined
    response.json ({
        user: request.affiche
    })
}
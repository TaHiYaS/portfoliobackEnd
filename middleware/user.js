const  User = require('../models/user');

exports.usrId =  function (request, response, session, id)  {
    User.findById(id).exec(function (erreur,  user) {
        if(erreur || !user) {
            return response.status(404).json({
                erreur :"utilisateur"
            })
        }
        request.affiche = user;
        session();
    })
}

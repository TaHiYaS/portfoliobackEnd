
exports.sign_upValidationUser =  function (request, response, session)  {
    request.check('name','le nom est obligatoire').notEmpty();
    request.check('email','Email est obligatoire').notEmpty().isEmail();
    request.check('password','password est obligatoire').notEmpty().isLength({min: 4, max: 11}).withMessage('Password contient minimun 4 caractere');
    const erreurs = request.validationErrors()
    if(erreurs){ return response.status(400).json({erreur: erreurs[0].msg})}
    session()
} 
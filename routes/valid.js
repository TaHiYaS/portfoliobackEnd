const express = require('express'); // import express  
const router = express.Router(); // create express router
const { hello, sign_up, sign_in, sign_out} = require('../controller/validController'); // import user controller
const { sign_upValidationUser } = require('../middleware/validatorUser'); // import user validator

const { rerquireSign_In } = require('../middleware/validation'); // import authentication middleware

router.get('/', hello); // get request to / )
router.post('/sign_up', sign_upValidationUser ,sign_up); // post request to /sign_up
router.post('/sign_in' ,sign_in); // post request to /sign_up
router.get('/sign_out' ,sign_out); // post request to /sign_up
router.get("/data",rerquireSign_In, (request, response) => {response,send('test');})

module.exports = router; // export router
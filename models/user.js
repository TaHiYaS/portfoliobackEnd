
const mongoose = require('mongoose'); // import mongoose
const crypto = require('crypto'); // import crypto
const uuidv1 = require("uuid").v1;

const schemaUser = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 100,
        required: true,
        unique: true
    },
    hashed_password:{
        type: String,
        required: true,
    },
    salt: {
        type: String
    },
    about:{
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },

    history: {
        type: Array,
        default: []
    } 
}, {timestamps: true})

schemaUser.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.cryptPassword(password)
})
.get(function() { return this._password; })

schemaUser.methods = {
    authenticate: function (password) {
        return this.cryptPassword(password) === this.hashed_password;
    },
    cryptPassword: function(password) { if(!password) return '';
        try {
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (erreur) { return '' }
    }
}

module.exports = mongoose.model('User',schemaUser);
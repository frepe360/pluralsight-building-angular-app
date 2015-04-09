var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required:'(PATH) is required!'},
    lastName: {type: String, required:'(PATH) is required!'},
    username: {
        type: String,
        required:'(PATH) is required!',
        unique:true
    },
    salt: {type: String, required:'(PATH) is required!'},
    hashed_pwd: {type: String, required:'(PATH) is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
}

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if(collection.length === 0) {
            console.log('I will now populate the database');
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'frepe');
            User.create({firstName: 'Fredrik', lastName: 'Persson', username: 'frepe', salt: salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'alice');
            User.create({firstName: 'Alice', lastName: 'Persson', username: 'alice', salt: salt, hashed_pwd: hash});
        }
        else {
            console.log('the database was already populated');
        }
    })
}

exports.createDefaultUsers = createDefaultUsers;



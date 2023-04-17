/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')

module.exports = {

    tablename: 'user',
    attributes:
    {

        username:{

            type: 'string'

        },

        email:
        {
            type:'string',
            isEmail: true,
            unique: true

        },

        userProfile:
        {
            type:'string'

        },

      
        password:
        {
            type: 'string',
            minLength: 8


        },

        accountid: {
            collection: 'account',
            via: 'accountid'
        },

        useremailAccountid:
        {
          collection: 'account',
          via: 'emailAccountid',
          through: 'accountbyemail'

        }

      
    },


    beforeCreate: function(values, cb) {
        // Hash password
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) return cb(err);
        
            values.password = hash;
     
            cb();
        });
    },
}


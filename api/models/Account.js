/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const { model } = require("mongoose")

module.exports =
{
  tableName: 'account',
  attributes: 
  {

          accountname:{
  
              type: 'string'
  
          },
  
          accountid:
          {
              model: 'user'
          },

          accountBalance: {
            type: 'number',
            defaultsTo: 0
          },


        transactionid:
        {
            collection: 'transaction',
            via: 'transactionid'

      
        },

        emailAccountid:
        {
          collection: 'user',
          via: 'useremailAccountid',
          through: 'accountbyemail'

        }
      

    
    
  },
    
};
  

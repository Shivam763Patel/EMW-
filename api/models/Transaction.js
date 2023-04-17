/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {


  tableName: 'transaction',
 
 
  attributes: {
 
 
    accountType:
    {
      type:'string'
    },
    transactionAmount:
    {
      type: 'number'
    },
    transactionDate:
    {
      type:'ref',
      columnType:'datetime'
    },

    transactionid:
    {
      model: 'account'
 
 
    }
 
 
  },
 
 
 };
 
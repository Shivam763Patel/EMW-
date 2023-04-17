/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': 
  {
     view: 'signup'
  },


  'post /signup': 'AuthController.signup',


  'get /login': 
  {
    view: 'login'
  },
  

  'post /login': 'AuthController.login',

  //dashboard
  'get /dashboarduser': { view: 'dashboard'},
  'get /dashboarduser/:id': 'AccountController.info_account',

  // //View member accounts
  'get /dashboarduser/viewMembers/:id': 'AccountController.info_account_member',

  // //List of transaction for account
  // 'get /dashboarduser/tr/:id': 'TransactionController.viewTranscation',

  //Add user to my account by name
  'get /dashboarduser/adduseraccount/:id': 'UserController.addUserAccountPage',
  'post /dashboarduser/adduseraccount/:id': 'UserController.addUserAccount',

    //Add user to my account by Email
    'get /dashboarduser/adduserByemail/:id': 'AccountController.addUserEmailPage',
    'post /dashboarduser/adduserByemail/:id': 'AccountController.addUserEmail',
  
//Edit user into my account
'get /dashboarduser/edituseraccount/:id': 'UserController.editUserAccountpage',
'post /dashboarduser/edituseraccount/:id': 'UserController.editUserAccount',

//Edit User profile
'get /dashboarduser/edituserprofile/:id': 'UserController.edituserProfilePage',
'post /dashboarduser/edituserprofile/:id': 'UserController.edituserProfile',

//Chnage password
'get /dashboarduser/chnagePassword/:id': 'UserController.changePasswordPage',
'post /dashboarduser/changePassword/:id': 'UserController.changePassword',




//Delete User account 
'get /dashboarduser/deleteuseraccount/:id': 'UserController.deleteUserAccount',


//List of transaction 
  'get /dashboarduser/tr/:id': 'TransactionController.viewTranscation',

//Add transaction 
  'get /dashboarduser/addtransactionToaccount/:id': 'TransactionController.addTransactionPage',
  'post /dashboarduser/addtransactionToaccount/:id': 'TransactionController.addTransaction',

//edit  transaction 
'get /dashboarduser/tr/edituserTransaction/:id': 'TransactionController.editUserTransactionpage',
'post /dashboarduser/tr/edituserTransaction/:id': 'TransactionController.editUserTransaction',

//Delete User transaction 
'get /dashboarduser/tr/deleteuserTranscation/:id': 'TransactionController.deleteUserTranscation',


'get /dashboarduser/logout': 'AuthController.logout'




  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};

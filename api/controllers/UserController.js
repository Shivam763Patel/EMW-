/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;

module.exports = {

    
    // addUserAccount: async (req,res) => {
 
    //         const id = req.params.id
     
    //         await Account.findOne({id: id}).exec(function(err, result){
    //             console.log(result);
    //             if(err){
    //                 return err
    //             }
    //             return res.view('addUserAccount')
    //         })
        
        
        // const id = req.params.id

        // await Account.findOne({id: id}).create(
        //     {
                
        //         accountname: req.body.accountname
        //     })
        //     return res.view('/dashboarduser')
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({
        //             err: err.message
        //         })
        //     })
        // },

     

        addUserAccountPage: async (req,res) => {
 
            const id = req.params.id
            return res.view('addUserAccount', {all: id})
            // await Account.find({ where: {accountid: id} }).exec(function(err, result){
            //     console.log('add account page opend',result);
            //     if(err){
            //         return err
            //     }
            //     return res.view('addUserAccount', {articles: result})
            // })
        
        },
        
           //Add user to account by name

           addUserAccount: async(req,res) => {

            console.log('for add user')
            console.log('kjkj',req.body);
            const accountname= req.body.accountname
            console.log('acc name',accountname)
            const id = req.params.id
            console.log("for add account id", id)
            await Account.create({

                accountid: id ,
                accountname: accountname
            })
            .fetch()
            .then(result => {
                console.log("added data", result)
                console.log('add user',req.user.userid)
                const id = req.user.userid
                // return res.view('dashboard', {all: id})
                return res.redirect(`/dashboarduser/${id}`)
            
            })
        },
        
        //Edit User Acccount
        editUserAccountpage: async (req,res) => {
 
            const id = req.params.id
     
            await Account.findOne({id: id}).exec(function(err, result){
                console.log(result);
                if(err){
                    return err
                }
                const acc = result.accountid
                return res.view('editUserAccount', {articles: result, all: acc })
            })
        
        },

        editUserAccount: async(req,res) => {

            const accountname = req.body.accountname
            console.log("Account name is", accountname)
            const id = req.params.id
            console.log("Updated id", id)
            await Account.update( {
        
                id: id
            },
            {
                accountname: accountname    

            }
            )
            .fetch()
            .then(result => {
                console.log("Updated data", result)
                console.log('edit user',req.user.userid)
                const edituserid = req.user.userid
                return res.redirect(`/dashboarduser/${edituserid}`)
            
            })
        },

        //Edit User profile Page
        edituserProfilePage: async (req,res) => {
 
            const id = req.params.id
     
            await User.findOne({id: id}).exec(function(err, result){
                console.log(result);
                if(err){
                    return err
                }
                const acc = result.id
                return res.view('editUserProfile', {articles: result, all: acc })
            })
        
        },


        //POST: Edit User profile
        editUserProfile: async(req,res) => {

            const email = req.body.email
            

            // Configuration 
        cloudinary.config({
            cloud_name: "doymdnqtc",
            api_key: "836517598646324",
            api_secret: "odxoPKWLEarKoMzE5OQg3LmxjrU"
        });




            let file = req.file('userProfile');

            let addFile = await sails.upload(file, { maxBytes: 100000000 }); // uploading file to sails local
            //Sync to the .temp folder
            console.log(addFile);
            const result = await cloudinary.uploader.upload(addFile[0].fd, { folder: 'Users/Profile', public_id: addFile[0].filename })
            console.log('data file', result.url)


            console.log("Account email is", email)
            const id = req.params.id
            console.log("Updated id", id)
            await User.update( {
        
                id: id
            },
            {
                email: email,
                userProfile:result.url,

            }
            )
            .fetch()
            .then(result => {
                console.log("Updated data --------", result)
                console.log('edit user',req.user.userid)
                const edituserid = req.user.userid
                return res.redirect(`/dashboarduser/${edituserid}`)
            
            })
        },


    // Change User Password Page  
    changePasswordPage: async (req,res) => {
 
        const id = req.params.id
        return res.view('changePassword', {all: id})
    
    },

    //Post: Change User Password Page  
    changePassword: async (req,res) => {

        const id = req.params.id
        try
        {
            
            const password = req.body.password
            const confirmpassword = req.body.confirmpassword

        if (password === confirmpassword)
        {
            bcrypt.hash(confirmpassword, 10, async (error,result) => {
    
                if (error)
                {
                    console.log("Something went wrong, please try again !");
                }
                else 
                {
                    User.updateOne({ id: id }, { password: result })
                        .then(result => {
                            console.log("User password ", result);
                            const id = req.user.userid
                            return res.redirect(`/dashboarduser/${id}`)
                      
                        })
                }
            })
        }
  
    }
    catch(error)
    {
            res.status(500).json({
                error: error.message
            })
            console.log(error);
    }
    },


    //Delete account for user
    deleteUserAccount: async (req, res) => {
        const id = req.params.id
     
        await Account.destroy({ id: id })
            .then(result => {
                const deleteuserid = req.user.userid
                return res.redirect(`/dashboarduser/${deleteuserid}`)
         
            })
    },


    }

/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary').v2;

/* module.exports = function flash(req, res, next) {
    if (!req.session.flash) {
      req.session.flash = {};
      req.session.flash['success'].push = ('Updated successfully');
    //   req.session.flash['warning'] = [];
    }
    next();
  }; */


module.exports = {


    signup: async (req, res) => {




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





        await User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userProfile: result.url

            })

            .fetch()
            .then(async result => {

                console.log(result)

                if (result) {
                    console.log(result.email)
                    console.log(result.id)

                    const jwt_secret = process.env.JWT_KEY || 'secret'
                    const token = jwt.sign(
                        {
                            email: result.email,
                            userid: result.id

                        },
                        jwt_secret,
                        { expiresIn: '12h' }

                    );


                    // res.setHeader("x-auth-token", token)

                    console.log(token)

                    //For sending email using nodemailer
                    //    await sails.helpers.sendEmail.with({

                    //         to: req.body.email,
                    //         subject: 'Welcome Mail',
                    //         text:'Hello from, Expense Manager. This is a welcome mail to acknowledge you. Thank you'
                    //     });

                    await Account.create({
                        accountid: result.id,
                        accountname: "default",

                    });
                    res.cookie('tokenall', token, {
                        httpOnly: true
                    })
                    console.log(res.cookie)
                    console.log('sign up done')
                    return res.status(202).redirect('/login')


                }
                else {
                    return res.status(500).send({

                        message: 'Signup failed',

                    })
                }


            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    err: err.message
                })
            })
    },


    // viewlogin: (req,res) => {

    //     return res.view('login')
    // },


    // flash: (req, res) =>  {
    //     if (!req.session.flash) {
    //       req.session.flash = {};
    //       req.session.flash['success'].push = ('Updated successfully');
    //     //   req.session.flash['warning'] = [];
    //     }
    //   },    

    login: async (req, res, message) => {

        const email = req.body.email
        const password = req.body.password

        console.log(email)
        console.log(password)
        try {


            const userData = await User.findOne({ email: email });
            // const userData = await User.find({ where: {email: email} })

            console.log('userdata', userData)
            if (!userData) {
                return res.status(400).json({
                    message: 'No such user',
                });
            }

            console.log('login pass', password)
            console.log('userdata for login', userData.password)
            console.log('userdata', userData)
            bcrypt.compare(password, userData.password, function (err, result) {
                console.log(result)

                if (result) {

                    console.log('email', userData.email)
                    const jwt_secret = process.env.JWT_KEY || 'secret'
                    const token = jwt.sign(
                        {
                            email: userData.email,
                            userid: userData.id

                        },
                        jwt_secret,
                        { expiresIn: '12h' },


                    );


                    console.log('email of user', email)

                    const result = { email: userData.email, username: userData.username }
                    // req.addflash('Success','Logged in to your account !')
                    res.cookie('tokenall', token, { httpOnly: true })

                    // .status(200).send({
                    // //     message: 'Login successfull',
                    // //     data: result,
                    // //     token: token,
                    // //   });

                    console.log('ghfhf', userData);
                    const id = userData.id
                    console.log('hghjkgufy', id)
                    req.addFlash('success', 'successfull logged In ');
                    return res.redirect('/dashboarduser/' + id)
                }
            })

            //     console.log('login token:',token)
            //    // res.redirect('/login')

            //         return res.status(200).json
            //         ({ 
            //             message: 'logged in',

            //         })


        }

        catch (err) {
            console.log(err);
            res.status(500).json({
                err: err.message
            })
        }

    },

    logout: async function (req, res) {
        try {
            res.clearCookie('tokenall').redirect('/login')
           return res.status(200).json({
                statusCode: 200,
                message: 'Logout'
            })
        }
        catch (error) {
            return res.status(500).json({
                error: error
            })
        }
    },



}

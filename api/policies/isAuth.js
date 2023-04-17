const jwt = require("jsonwebtoken")
const User = require("../models/User")
module.exports = async (req,res,proceed) => {

      
         try
                {
                    const token  = req.cookies.tokenall
                    console.log(token)
             
                    const jwt_secret=process.env.JWT_KEY || 'secret'
                    console.log('jwt data',jwt_secret)
             
                    const decoded = jwt.verify(token,jwt_secret)
                    console.log('auth data user',decoded)
                    // req.user = decoded
                    // console.log(req.user)
                    // next()

                    // res.redirect('/dashboarduser')

                    if(decoded) {
                        // const user  = await User.findOne({ email: decoded.email, userid: decoded.id});
                       
                        // console.log('auth user deatils',user)
                        req.user= decoded
                        console.log('user full data of req user',req.user)
                        // console.log('data req user'+req.user)
                        proceed()
                        // return res.redirect('/dashboarduser')
                        // console.log('auth data',req.user)
                    
                    }
                    else{
                        return  res.status(401).send({
                            message: 'Please Login for dashboard again'
                           
                    })
                    }
                }
                catch(err)
                {
                   
                        console.log(err)
                        return res.status(401).send({
                            message: "Please Login again new new"
                    })
                    
                    
                }
    

   
}
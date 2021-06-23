const  exp = require("express")
const adminApi= exp.Router()

const jwt = require("jsonwebtoken")
const expressErrorHandler = require("express-async-handler")
adminApi.use(exp.json())


adminApi.post("/login",expressErrorHandler( async (req, res , next )=>{

            let admincollectionObj = req.app.get("admincollectionObj")
         
         
            let credentials = req.body;
         
           let user =  await admincollectionObj.findOne({username:credentials.username})
         
            if(user == null){
               res.send({message: "invalid username"})
            }
         else{
            // comapre the password
         
          //  let result = await bcryptjs.compare(credentials.password, user.password)
         
            if(credentials.password !== user.password){
               res.send({message: "invalid password "})
            }
         
            else{
               let token= await jwt.sign({username: credentials.username}, "ababa",{expiresIn:120})
         
               delete(user.password)
               res.send({message: "login-successfull", 
               token:token, 
               username: credentials.username,
               userObj: user
            }
            )
            }
         }
         }))
         









module.exports = adminApi;
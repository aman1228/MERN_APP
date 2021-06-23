const jwt = require("jsonwebtoken")
const checkToken= (req, res, next )=>{

            try{
            let token = req.headers.authorization.split(" ")[1]
            if(token === undefined){
                        return res.send({message:"please login to continue"})
            }
            jwt.verify(token,"ababa")
            next()
            }
            catch(err){
                        res.send({message:"authentication failed"})
            }
}

module.exports=checkToken;
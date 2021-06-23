const exp= require("express")
const userApi = exp.Router();
userApi.use(exp.json())
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const expressErrorHandler = require("express-async-handler")
const multerObj = require("./middlewares/addfile")
const checkToken= require("./middlewares/verifyToken")



// get users
userApi.get("/getusers",expressErrorHandler( async  (req,res, next )=>{

   let usercollectionObj = req.app.get("usercollectionObj")

      let userList= await usercollectionObj.find().toArray();
      res.send({message: userList})
}))


//find user
userApi.get("/getusers/:username",expressErrorHandler(async (req, res, next)=>{

   let usercollectionObj = req.app.get("usercollectionObj")


   let un = req.params.username;

 let userObj= await  usercollectionObj.findOne({username:un})

 if(userObj == null){
   res.send({message: "user not found"})
}
else{
   res.send({message: userObj})
}

}))

//create user
userApi.post("/createusers",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
   
   let usercollectionObj = req.app.get("usercollectionObj")

   let newUser=JSON.parse(req.body.userObj);
    let user= await usercollectionObj.findOne({username:newUser.username})

    if(user!==null){
        res.send({message:"user allready existed"})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUser.password,7)
        newUser.password=hashedPassword;
        newUser.ProfileImage=req.file.path;


        await usercollectionObj.insertOne(newUser)
        res.send({message:"user created"})
    }
}))

//update user
userApi.put("/updateuser/:username",expressErrorHandler( async(req, res,next)=>{

   let usercollectionObj = req.app.get("usercollectionObj")

   let modifiedUser=req.body;

 await usercollectionObj.updateOne({username:modifiedUser.username},
               {$set:{  ...modifiedUser }
                           }  )

   res.send({message:"user updated"})
   }))


   userApi.put("/deleteuser/:username", expressErrorHandler(async (req, res, next )=>{


   let usercollectionObj = req.app.get("usercollectionObj")

      let un= req.params.username;

      let user = await usercollectionObj.findOne({ username: un })

      if(user == null){
         res.send({message: "user not found"})
      }

      else{
         await usercollectionObj.deleteOne({username: un})
         res.send({message: "user removed"})
      }

   }))

//login

userApi.post("/login",expressErrorHandler( async (req, res , next )=>{

   let usercollectionObj = req.app.get("usercollectionObj")


   let credentials = req.body;

  let user =  await usercollectionObj.findOne({username:credentials.username})

   if(user == null){
      res.send({message: "invalid username"})
   }
else{
   // comapre the password

   let result = await bcryptjs.compare(credentials.password, user.password)

   if(result == false){
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

userApi.get("/testing", checkToken,expressErrorHandler((req, res)=>{
   
   res.send({message:"this is protected"})
}))

module.exports = userApi;


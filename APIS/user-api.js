const exp= require("express")
const userApi = exp.Router();
userApi.use(exp.json())
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const expressErrorHandler = require("express-async-handler")
const multerObj = require("./middlewares/addfile")
const checkToken= require("./middlewares/verifyToken");
const { response } = require("express");
require("dotenv").config()



// get users
userApi.get("/getusers",expressErrorHandler( async  (req,res, next )=>{

   let usercollectionObj = req.app.get("usercollectionObj")

      let userList= await usercollectionObj.find().toArray();
      res.send({message: userList})
}))

userApi.get("/getcartproducts/:username",expressErrorHandler( async  (req,res, next )=>{

   let usercartcollectionObj = req.app.get("usercartcollectionObj")
   let un = req.params.username

      let list= await usercartcollectionObj.find({username:un}).toArray();
      res.send({message: list})
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
       let hashedPassword=await bcryptjs.hash(newUser.password,9)
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
      let token= await jwt.sign({username: credentials.username}, process.env.SECRET ,{expiresIn:120})

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

userApi.post("/addtocart",expressErrorHandler(async(req, res, next)=>{

let  usercartcollectionObj = req.app.get("usercartcollectionObj")

let usercartObj = req.body;
//console.log("usercart is ",usercartObj)
let  userInCart = await usercartcollectionObj.findOne({username: usercartObj.username})

if(userInCart === null){

   let products=[];  
   products.push(usercartObj.productObj)

   let newUserCartObj = {username: usercartObj.username, products:products};

   console.log(newUserCartObj)
   
   await usercartcollectionObj.insertOne(newUserCartObj)
   res.send({message: "product added to cart"})
}
else{
   userInCart.products.push(usercartObj.productObj)
   //update
   await usercartcollectionObj.updateOne({username:usercartObj.username},{$set:{...userInCart}})
   res.send({message:"product addeded to cart"})

}

}))

userApi.get("/testing", checkToken,expressErrorHandler((req, res)=>{
   
   res.send({message:"this is protected"})
}))

module.exports = userApi;


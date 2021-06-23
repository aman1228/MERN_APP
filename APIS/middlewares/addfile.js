
// import cloudinary 
const cloudinary=  require("cloudinary").v2

const multer = require("multer")

const {CloudinaryStorage}= require("multer-storage-cloudinary")

//config

cloudinary.config({
   cloud_name: "dfdzkvdzj" ,
   api_key:899187553168236,
   api_secret:"5sNAfYVpkXzHgGWmGON_xJUGn-I"
})

//config lcoudnary storage 
const clstorage = new CloudinaryStorage({
   cloudinary:cloudinary,
   params:async(req, file)=>{
      return{
         folder:"cts",
         public_key: file.fieldname + "-" + Date.now()
      }
   }
})


const multerObj= multer({storage: clstorage})

module.exports = multerObj
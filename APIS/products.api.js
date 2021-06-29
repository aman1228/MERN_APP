const exp= require("express")
const productApi = exp.Router();



productApi.use(exp.json())

// import cloudinary 
const cloudinary=  require("cloudinary").v2

const multer = require("multer")

const {CloudinaryStorage}= require("multer-storage-cloudinary")

//config

cloudinary.config({
   cloud_name: "dfdzkvdzj" ,
   api_key:process.env.api_key,
   api_secret:process.env.api_secret
})

//config lcoudnary storage 
const clstorage = new CloudinaryStorage({
   cloudinary:cloudinary,
   params:async(req, file)=>{
      return{
         folder:"productcollection",
         public_key: file.fieldname + "-" + Date.now()
      }
   }
})


const multerObj= multer({storage: clstorage})


//read all users using promise

productApi.get("/getproducts",async (req,res, next )=>{

   let productcollectionObj = req.app.get("productcollectionObj")
   let productList= await productcollectionObj.find().toArray()
   res.send({message: productList})
   

})

/*

productApi.get("/getproduct/:productname",(req, res, next)=>{

            let productname = req.params.productname;

            productcollectionObj.findOne({productname:productname})
            .then(productObj =>{
                        if(productObj == null){
                                    res.send({message: "product not found"})
                        }
                        else{
                                    res.send({message: productObj})
                        }
            })
            .catch(err=>{
                        console.log("err in reading users",err)
                        res.send({message:err.message})
            })
})
*/

productApi.post("/createproducts",multerObj.single("photo"),(async(req, res)=>{

   let productcollectionObj = req.app.get("productcollectionObj")

            let newProduct= JSON.parse(req.body.productObj);

           let product = await productcollectionObj.findOne({ productname: newProduct.productname})


                        if(product !== null){
                                    res.send({message: "product already existed"})
                        }
                        else{
                              newProduct.ProductImage=req.file.path;
                                    productcollectionObj.insertOne(newProduct)
                                    .then((success)=>{
                                                res.send({message: "product added"})
                                    })
                                    .catch(err => res.send(err.message))
                        }
      
}))


productApi.put("/updateproduct/:productname",(req, res,next)=>{
            let modifiedProduct=req.body;

            let productname= req.params.productname;
            productcollectionObj.updateOne({productname:modifiedProduct.productname},
                        {$set:{ 
                                    productname:modifiedProduct.productname
                            
                                     }}  )
         .then(success=>{
                     res.send({message:"product  updated"})

         })
         .catch(err=>{
                     console.log("err in update",err)
                     res.send({message:err.message})
         })
            })            

productApi.delete("/deleteproduct/:productname",(req, res, next)=>{

            let  productname= req.params.productname;
            
})

















module.exports=productApi;













































/*


let products=[];

productApi.get("/getproducts",  (req, res)=>{
            if(products.length===0){
                        res.send({message:"no product"})
            }
            else{
                        res.send(products)
            }
})

productApi.get("/getproducts/:productname",(req,res)=>{

            let productname = req.params.productname;
            let matchedproduct= products.filter((productsObj)=> productsObj.productname===productname)
            if(matchedproduct.length===0){
                        res.send({message:`product is not found with name ${productname} `})
            }
            else{
                        res.send(matchedproduct[0])
            }
})

productApi.post("/createproduct",(req,res)=>{

            let product= req.body;
            let matchedproduct= products.filter((productObj)=> productObj.productname=== product.productname)
            console.log(matchedproduct.length)
            if(matchedproduct.length===0){
                        products=[...products, product]
                        res.send({message:"New product created"})
            }

            else{
                
                        res.send({message:`product with name ${product.productname} already exist`})

            }

})

productApi.put("/updateproduct/:productname",(req,res)=>{
            
            let updatedproduct = req.body;
            console.log(updatedproduct)

            return  products.map((productObj, ind)=>{
                        if(productObj.productname===req.params.productname){
                                    products.splice(ind,1,updatedproduct)
                                    res.send({message:"product  updated"})
                        }
                        else{
                                    res.send({message:"no product is  found to update"})
                        }
            })
            })


productApi.delete("/deleteproduct/:productname",(req,res)=>{
            
     
            return  products.map((productObj, ind)=>{
                        if(productObj.productname===req.params.productname){
                                    products.splice(ind,1)
                                    res.send({message:"product  deleted"})
                        }
                        else{
                                    res.send({message:`no product is  found to delete with productname ${req.params.productname}`})
                        }
            })
})

*/
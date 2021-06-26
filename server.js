const exp = require ("express")
const app  = exp();
const path = require("path")

require("dotenv").config()

app.use(exp.static(path.join(__dirname,"./build/")))
const userApi = require("./APIS/user-api")
const productApi = require("./APIS/products.api")
const adminApi = require("./APIS/admin-api")

app.use("/user", userApi)
app.use("/product", productApi)
app.use("/admin", adminApi)


const mongoClient = require("mongodb").MongoClient;

//db connection

const dburl = process.env.DATABASE_URL
let databaseObj;

// connect 

mongoClient.connect(dburl,{useNewUrlParser:true, useUnifiedTopology:true},(err, client )=>{
            if(err){
                        console.log("error iin dbb connect ",err)
            }
            else{
                        databaseObj= client.db("amansaxena2899")
                        //user collection object
                      let  usercollectionObj = databaseObj.collection("usercollection")
                      let  admincollectionObj = databaseObj.collection("admincollection")
                      let   productcollectionObj = databaseObj.collection("productcoll")
                      let   usercartcollectionObj = databaseObj.collection("usercartcollection")
                      

                        app.set("usercollectionObj",usercollectionObj)
                        app.set("admincollectionObj",admincollectionObj)
                        app.set("productcollectionObj",productcollectionObj)
                        app.set("usercartcollectionObj",usercartcollectionObj)

                        console.log("db  connected")

            }
})











app.get('/*', (req, res)=> { 
            res.sendFile(path.join(__dirname, './build/index.html'), function(err) { 
                        if (err) { 
                                    res.status(500).send(err) 
                        }
             })
 })





app.use((req, res, next)=>{
            res.send({message: `path ${req.url} is invalid `})
})

app.use((err,req, res, next)=>{
            console.log(err)
            res.send({message : err.message})
})
const port=process.env.PORT||8080;
app.listen(port, ()=>console.log(`server is listening on port `))
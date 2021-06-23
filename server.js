const exp = require ("express")
const app  = exp();
const path = require("path")


app.use(exp.static(path.join(__dirname,"./build/")))
const userApi = require("./APIS/user-api")
const productApi = require("./APIS/products.api")
const adminApi = require("./APIS/admin-api")

app.use("/user", userApi)
app.use("/product", productApi)
app.use("/admin", adminApi)


const mongoClient = require("mongodb").MongoClient;

//db connection

const dburl = "mongodb+srv://amansaxena2899:amansaxena28@cluster0.ikqc9.mongodb.net/amansaxena2899db?retryWrites=true&w=majority"

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

                        app.set("usercollectionObj",usercollectionObj)
                        app.set("admincollectionObj",admincollectionObj)
                        app.set("productcollectionObj",productcollectionObj)

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
const port=8080
app.listen(port, ()=>console.log(`server is listening on port `))
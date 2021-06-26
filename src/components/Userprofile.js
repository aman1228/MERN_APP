import {useHistory, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import {BrowserRouter, Switch, Link, Route, Redirect,useRouteMatch} from "react-router-dom"
import Listofproducts from "./Listofproducts";
import Usercart from "./Usercart";
import axios from "axios";

function Userprofile ( ) {

   let[user, setUser]= useState(" ")
   const[product, setProduct]= useState(0);
   let history = useHistory();
   let paramObj = useParams();
   let [count, setcount] = useState(0)
   let [cd, setCd]= useState([])



   let addProductToCart = (productObj)=>{

         let username = localStorage.getItem("username")
         console.log(productObj)

         let newObj = {username,productObj}

         console.log("product added by the user is ",newObj)

         axios.post("/user/addtocart", newObj)
         .then(res =>{
         let  resObj = res.data
         setProduct(product+1)
            alert(resObj.message)
         history.push("/usercart")
         
         })
         .catch(err=>{
            console.log("err in adding to cart", err)
         })
      }


   const handlelogout=()=>{
               console.log("hello aman")
      
               localStorage.removeItem("token")
               history.push("/home")
   }

   useEffect(()=>{
            /*
               axios.get(`/user/getusers/${paramObj.username}`)
               .then(res=>{
                           let userObj = res.data.message;
                           setUser({ ...userObj })
               })
               */
               let username = localStorage.getItem("username")
               axios.get(`/user/getcartproducts/${username}`)
               .then(res=>{
                           let productsObj = res.data.message;
                           let products= productsObj[0].products
                           
                           let countt=products.length;
                           
                           console.log("count isss",countt)
                  
                           setCd([...productsObj]) 
                           setcount(countt)
               },[])
               .catch(err=>{
                  console.log(err)
                           alert("something went wrong ")
               })
               let userObj = JSON.parse(localStorage.getItem("user"))
               setUser({...userObj })
   }, [paramObj.username,product])


        let path = useRouteMatch();
        console.log(path)
        let url = useRouteMatch();

            return (
               <div>
               <h1 className="text-end">Welcome  ,<span className="text-danger">{user.username}</span>
               <img src={user.ProfileImage}  width="100px" alt="" className="me-3 bg-light" />
               </h1>
            
               <BrowserRouter>
               <div className="container"> 
               <ul className="nav ">
               <li className="nav-item">
                           <Link to = {`${url.path}/listofproduct`} className="nav-link text-light bg-danger me-3">List of Products</Link>
                           </li>

                           <li className="nav-item">
                           <Link to = {`${url.path}/usercart`} className="nav-link text-light bg-danger position-absolute top-25 end-25">Cart
                           <span className="badge text-dark ms-2 bg-light">{count}
                           </span></Link>
                           </li>
               </ul>
               </div>
               

            <Switch>

         <Route path={`${url.path}/listofproduct`}>
         <Listofproducts addProductToCart = {addProductToCart} />
                     </Route>


                     <Route path={`${url.path}/usercart`}>
                     <Usercart product={cd} />
                     </Route>


         <Route path={`${url.path}`}>
                  <Redirect to ={`${url.path}/listofproduct`} />
               </Route> 

            </Switch>         
            </BrowserRouter> 
            </div>
            )
}

export default Userprofile;



                            {/*  <div className="text-end me-2">
                                <button className="btn btn-danger btn-sm float-right" onClick={handlelogout}>Log Out</button>            
                             <h3>Email:<span className="text-danger"> {user.email}</span></h3>
                                </div> */}
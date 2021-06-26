import { useState } from "react";
import { useEffect} from "react";
import axios from "axios";

function Listofproducts(props){

         const   [product, setProduct]= useState("");
        let [user,setUser]= useState(true);

         useEffect(()=>{
            axios.get("/product/getproducts")
            .then(res=>{
                        let productsObj = res.data.message;
                        console.log("product obj is ", productsObj)
                        setProduct([...productsObj]) 
                        let arrayofObj = productsObj
                        console.log("array is ",arrayofObj)

            })
            .catch(err=>{
                        alert("something went wrong")
            })

            let usertyp = localStorage.getItem("usertyp")
            if(usertyp== "admin")
            {
                setUser(true)
            }
            else{
                setUser(false)
            }

            }, [product.productname])

            return(
                    <div className="row row-col-sm-3 mt-3 ">
                        {

                      product  &&    product.map((element)=>{
                                    return(
                <div className="col-sm-2 container" >
                            <div className="card">
                        <img className="card-mg-top d-block mx-auto" src={element.ProductImage} width="220px" height="200px"  />
                        <div class="card-body">
                            <h5 class="card-title">Product Name: {element.productname}</h5>
                        <h5>Cost: {element.costOfProduct}</h5>
                        {
                            user?
                            <div>
                                <button className="btn btn-danger">Edit</button>
                                <button className="btn btn-danger float-end">Delete</button>
                            </div>:
                     
                        <button className="btn btn-primary float-end" 
                        onClick={()=>props.addProductToCart(element)}>
                            Add to Cart
                            </button>

                               }
                        </div>
                        </div>
                </div>
                        

            )
                        })

                        }
                    </div>
             
            )
}

export default Listofproducts;
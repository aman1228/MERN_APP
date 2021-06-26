import axios from "axios";
import { useEffect, useState } from "react";


function Usercart(props){

        let product=props.product;
        console.log("product is sss", product)


            return(
              
      <div className="container">
                  <table class="table table-striped text-center mt-3">
  <thead>
    <tr className="bg-danger text-light mt-3">
      <th>product image </th>
      <th >modelNO</th>
      <th >productname</th>
      <th>costOfProduct</th>
      <th></th>
    </tr>
  </thead>
<tbody>

{
    product && product.map((ele)=>{
                return(
                            
                ele.products.map((element, ind)=>{
                            return(
                              <tr key={ind}>
                            <td ><img src={element.ProductImage} width="100px" height="100px"  /></td>
                            <td >{element.modelNO}</td>
                            <td >{element.productname}</td>
                            <td >{element.costOfProduct}</td>
                            <td><button className="btn btn-danger">Delete</button></td>
                            </tr>
                            )
                })
                )
    })
  }

</tbody>
</table>
      </div>
          
          
          )

}

export default Usercart;
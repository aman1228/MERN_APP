
import { useHistory } from "react-router-dom"

function Products(){
           let  history= useHistory();

       

            const handleaddProducts=()=>{
                        history.push("/addproducts")
                        
            }

            const handlelist = (e)=>{
                     
     history.push("/listofproduct")
            }
            return(
            <div>

                        <h1>Products</h1>
                        <button className="btn btn-danger me-4 ms-5" onClick={()=>handleaddProducts()}>Add Products</button>
                        <button className="btn btn-danger" onClick={(e)=>handlelist(e)}>list of items</button>
                        </div>
            
            )
}

export default Products;
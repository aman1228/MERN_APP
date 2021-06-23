import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";


function AddProducts(){
    const history = useHistory();
    const [file, setFile]= useState(" ");
            let {register ,handleSubmit,formState:{errors}}= useForm();

            const onFormsubmit=(productObj)=>{
                        console.log(productObj)
                        let formData =  new FormData()

                        formData.append("photo" , file, file.name)
        
                        formData.append("productObj", JSON.stringify(productObj))

                        axios.post("/product/createproducts",formData)
                        .then(res=>{
                            let resObj= res.data
                            alert(resObj.message)
                            //navigate to the other page that is login 
                            history.push("/products")
                        })
                        .catch(err=>{
                            alert("something went wrong")
                        })
                       }

                       const onFileSelect=(e)=>{
                        console.log(e.target.files[0])
                       setFile(e.target.files[0])
                    }

            return(
                        <div>
                            <h3 className="ms-3 mt-3">Add Product</h3>
                        <form className="w-50 mx-auto " onSubmit={handleSubmit(onFormsubmit)}>
                                    
                                    <input type="text"
                                       id="pn" 
                                       placeholder="productname"
                                       {...register("productname")} 
                                       className="form-control mt-5 "
                                    />

                                        <input type="number"
                                       id="pn" 
                                       placeholder="modelNo"
                                       {...register("modelNO")} 
                                       className="form-control mb-3 mt-3"
                                    />
                                    
                                    <input type="file" 
                                    name="photo"
                                      className="form-control mb-3" 
                                      onChange={(e)=>{onFileSelect(e)}}/> 


                                    <input type="number"
                                       id="cost" 
                                       placeholder="costOfProduct"
                                       {...register("costOfProduct")} 
                                       className="form-control "
                                    />
                                    

                        <button type="submit"  className="btn btn-danger mt-3  me-2">Add Product</button>
                                    </form>
                                    </div>
            )
}

export default AddProducts;
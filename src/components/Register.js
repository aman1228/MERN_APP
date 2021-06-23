import {useForm} from "react-hook-form"
import axios from "axios"
import { useHistory } from "react-router-dom";
import { useState } from "react";
function Register(){

            let {register ,handleSubmit,formState:{errors}}= useForm();
            const history= useHistory();
            const [file, setFile]= useState(null);

            const onFormsubmit = (userObj)=> {

                let formData =  new FormData()

                formData.append("photo" , file, file.name)

                formData.append("userObj", JSON.stringify(userObj))
                console.log("userobj is ",userObj)

                axios.post("/user/createusers",formData)
                .then(res=>{
                    let resObj= res.data
                    alert(resObj.message)
                    //navigate to the other page that is login 
                    history.push("/login")
                })
                .catch(err=>{
                    alert("something went wrong")
                })
                        /*
                        fetch("/user/createusers",{
                                    method: "POST",
                                    headers:{
                                                "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(userObj),
                        }
                        ).then(res=>{
                                    return res.json()

                        }).then(
                                    data => alert(data.message)
                        )
                  */
        
                }

                const onFileSelect=(e)=>{
                    console.log(e.target.files[0])
                   setFile(e.target.files[0])
                }

            return(
                        <form className="w-50 mx-auto " onSubmit={handleSubmit(onFormsubmit)}>
                           
                        <input type="text" 
                        id="un" 
                        placeholder="username"
                        {...register("username",{required:true , minLength:5, maxLength:30 })} 
                        className="form-control mb-3 mt-5 ">
        
                        </input>
              
                        {errors.username?.type==="required"  && <p className="text-danger"> * Please enter the username </p>}
                        {errors.username?.type==="minLength" && <p className="text-danger">username should be of  Min 5  Char</p>}
                        {errors.username?.type==="maxLength" && <p className="text-danger">username should not be more  Max 30 Char</p>}
                        

 
                        <input type="password" 
                        id="pw" 
                        placeholder="password"
                        {...register("password",{required:true , minLength:5, maxLength:30 })} 
                        className="form-control mb-3">
        
                        </input>
              
                        {errors.username?.type==="required"  && <p className="text-danger"> * Please enter the associate name</p>}
                        {errors.username?.type==="minLength" && <p className="text-danger">Associate Name should be of  Min 5  Char</p>}
                        {errors.username?.type==="maxLength" && <p className="text-danger">Associate Name should not be more  Max 30 Char</p>}
                        


                        <input type="email" 
                        id="em" 
                        placeholder="email"
                        {...register("email",{required:true , minLength:5, maxLength:30 })} 
                        className="form-control mb-3">
        
                        </input>

                    <input type="file" name="photo"
                    className="form-control mb-3" 
                    onChange={(e)=>{onFileSelect(e)}}/> 

                        <button type="submit"  className="btn btn-primary mt-3  me-2">Submit</button>





                                    </form>
            )
}

export default Register;
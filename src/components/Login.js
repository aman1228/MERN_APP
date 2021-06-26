import {useForm} from "react-hook-form"
import axios from "axios";
import { useHistory } from "react-router-dom";


function Login(props){

    let {register ,handleSubmit,formState:{errors}}= useForm();
    const history = useHistory();

    const onFormsubmit = (credentials)=> {


        //console.log(userObj)
        axios.post(`${credentials.type}/login`,credentials)
        .then(res=>{
            let resObj = res.data;
            if(resObj.message ==="login-successfull"){
                // token to be saved to local storage
                localStorage.setItem("token",resObj.token)

                localStorage.setItem("user",JSON.stringify(resObj.userObj))

                localStorage.setItem("username",resObj.username)
                
                localStorage.setItem("usertyp",credentials.type)

                props.setUserLoginStatus(true)
                if(credentials.type=== "user"){    
                        //navigate to the usercomponent
                    history.push(`/userprofile/${resObj.username}`)

                }

                if(credentials.type=== "admin"){    
                    //navigate to the usercomponent
                    history.push(`/adminprofile/${resObj.username}`)
    
                }
            
            }
            else{
                alert(resObj.message)
            }
            
        })
        .catch(err=>{
            console.log(err)
            alert("something went wrong")
        })
    
}

            return(
    <form className="w-50 mx-auto " onSubmit={handleSubmit(onFormsubmit)}>
        <div>
            <h2>Login</h2>
        </div>
        <div className="mb-3">
        <input type="radio" 
         id="admin" 
                value="admin"
         {...register("type")} 
         className="form-check-input  mt-5">
               </input>
             <label className="form-check-label  mt-5 me-3" for=" admin">Admin</label>
     
        <input type="radio" 
         id="user" 
                value="user"
         {...register("type")} 
         className="form-check-input mt-5">
            </input>
            <label className="form-check-label  mt-5" for=" user">User</label>
        </div>

      
         <input type="text" 
         id="un" 
         placeholder="username"
         {...register("username")} 
         className="form-control mb-3">

         </input>

         <input type="password" 
         id="un" 
         placeholder="password"
         {...register("password")} 
         className="form-control mb-3">

         </input>


         <button type="submit"  className="btn btn-primary mt-3  me-2">Login</button>

      </form>
            )
}

export default Login;
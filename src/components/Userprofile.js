import {useHistory, useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

function Userprofile ( ) {

            let [user, setUser]= useState(" ")
            let history = useHistory();
            let paramObj = useParams();
            console.log("paramsObj is ",paramObj)

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
                       let userObj = JSON.parse(localStorage.getItem("user"))
                       setUser({...userObj })
            }, [paramObj.username])


            return(
                        <div>
                        <h1 className="text-end">Welcome  ,<span className="text-danger">{paramObj.username}</span></h1>
                                <div className="text-end me-2">
                                <button className="btn btn-danger btn-sm float-right" onClick={handlelogout}>Log Out</button>            
                          
                                </div>
                                     <div>
                                                <h3>Email:<span className="text-danger"> {user.email}</span></h3>
                                                <img src={user.ProfileImage}  width="200px" alt="" />
                                     </div>
                        </div>
            )
}
export default Userprofile;
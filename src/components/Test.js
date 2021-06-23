import axios from "axios";

function Test(){
            let token = localStorage.getItem("token")

            //create new axios req obj
            let apiUrl = "http://localhost:8080"

            const axiosReq = axios.create({

                        baseURL: apiUrl,
                        headers: {
                                    Authorization: `Bearer ${token}`
                        }
            })

            const makeReqProtectedRoute=()=>{
                        axiosReq.get("/user/testing")
                        .then(res=>{
                                    alert(res.data.message)
                        })
            }

            return(
                        <div>

                       
                        <h1>test</h1>
                        <button onClick={makeReqProtectedRoute}>make Req</button>
                        </div>
            )
}

export default Test;
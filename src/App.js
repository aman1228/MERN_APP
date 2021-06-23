import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import './App.css';
import Home from "./components/Home"
import Register from "./components/Register";
import Login from "./components/Login";
import Userprofile from "./components/Userprofile"
import Test from "./components/Test";
import Products from "./components/Products"
import AddProducts from "./components/AddProducts";
import Listofproducts from "./components/Listofproducts";
import AdminProfile from "./components/AdminProfile";
import { useState } from "react";


function App() {

    let [userLoginStatus, setUserLoginStatus]= useState("");

const handlelogout=()=>{
    localStorage.clear()
    setUserLoginStatus(false)
}

  return (
    <div className="App">
<BrowserRouter>
<ul className="nav bg-danger">
            <li className="nav-item">
            <Link to ="/home" className="nav-link text-light">Home</Link>
            </li>
            <li className="nav-item">
            <Link to ="/test" className="nav-link text-light">Test</Link>
            </li>

            <li className="nav-item">
            <Link to ="/register" className="nav-link text-light">Register</Link>
            </li>

            <li className="nav-item">
            <Link to ="/products" className="nav-link text-light">Products</Link>
            </li>
            {

                !userLoginStatus ?
            <li className="nav-item">
            <Link to ="/login" className="nav-link text-light">Login</Link>
            </li>:
            <li className="nav-item">
            <Link to ="/login" className="nav-link text-light" onClick={()=>handlelogout()}>Logout</Link>
            </li>
            }

            <li className="nav-item">
            <Link to ="/userprofile" className="nav-link text-light"></Link>
            </li>

            <li className="nav-item">
            <Link to ="/addproducts" className="nav-link text-light"></Link>
            </li>
            <li className="nav-item">
            <Link to ="/listofproduct" className="nav-link text-light"></Link>
            </li>
        </ul>

<Switch>
            <Route path="/home">
                <Home />

            </Route>


            <Route path="/register">
                <Register />

            </Route>

            <Route path="/products">
                <Products />

            </Route>

            <Route path="/login">
                <Login setUserLoginStatus={setUserLoginStatus} />

            </Route>

            <Route path="/userprofile/:username">
                <Userprofile />

            </Route>

            <Route path="/adminprofile/:username">
                <AdminProfile />

            </Route>

            <Route path="/test">
                <Test />

            </Route>
            <Route path="/addproducts">
                <AddProducts />
                

            </Route>

            <Route path="/listofproduct">
                <Listofproducts />
                

            </Route>
        </Switch>


        </BrowserRouter>

    </div>
  );
}

export default App;

import {BrowserRouter, Switch, Link, Route, Redirect} from "react-router-dom"
import Listofproducts from "./Listofproducts";
import AddProducts from "./AddProducts";

function AdminProfile(){

            return(
                        <>
                        <h1>hello admin</h1>
                        <BrowserRouter>
                        <ul className="nav ">
                                    <li className="nav-item">
                                    <Link to ="/addproduct" className="nav-link text-light bg-danger ms-5 me-5">Add Products</Link>
                                    </li>

                                    <li className="nav-item">
                                    <Link to ="/listofproduct" className="nav-link text-light bg-danger">List of Products</Link>
                                    </li>
                        </ul>

                        <Switch>

                                    <Route path="/addproduct">
                                    <AddProducts />
                                    </Route>

                                    <Route path="/listofproduct">
                                    <Listofproducts />
                                    </Route>

                        </Switch>

                        </BrowserRouter>
                        </>
            )
}

export default AdminProfile;
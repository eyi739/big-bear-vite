import React from "react";
import Navbar from "../Navbar.jsx";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}
export default Main;
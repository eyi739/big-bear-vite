import Navbar from "../Navbar.jsx";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <main>
                <Outlet />
            </main>    
        </div>
    )
}
export default MainLayout;
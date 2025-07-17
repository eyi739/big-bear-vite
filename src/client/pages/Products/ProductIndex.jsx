import Navbar from "../../../Navbar";
import useFetch from "../../hooks/useFetch";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { Link, useNavigate } from "react-router-dom";

export default function ProductIndex(){
    const data = useFetch('/api/products/');
    const navigate = useNavigate();
    return (
        <div>
            <CssBaseline/>
            <Navbar/>
            <Box container display="flex-col" justifyContent="center" alignItems="center" >
                <Typography variant="h1">All Products will be displayed here!!</Typography>
                {data.map((product, index) => (
                    
                    <li key={index} data-id={product.id}>
                        <Link key={product} to={`/products/${product.id}`}>
                            {product.title}
                        </Link>
                    </li>
                ))}
            </Box>
            
            
            {/* <Outlet/> */}
            {/* {data.map((item,index)=> (
                <li key={index}><a href="/products/:profileId">{item.title}</a></li>
                // <Link key={product} to={"/products/:profileId"}>
                //         Profile {product}
                //     </Link>
            ))} */}

        </div>
    )
}
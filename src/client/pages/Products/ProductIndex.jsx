import Navbar from "../../../Navbar"
import useFetch from "../../hooks/useFetch"
import { Link, useNavigate } from "react-router-dom"

export default function ProductIndex(){
    const data = useFetch('/api/products/');
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>
            
            <h1>All Products will be displayed here!!</h1>
            {
                data.map((product, index) => (
                    <li key={index} data-id={product.id}>
                        <Link key={product} to={`/products/${product.id}`}>
                            {product.title}
                        </Link>
                    </li>
                    
                ))
            }
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
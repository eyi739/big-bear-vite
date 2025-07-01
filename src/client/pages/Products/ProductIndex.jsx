import Navbar from "../../../Navbar"
import useFetch from "../../hooks/useFetch"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function ProductIndex({productId}){
    const data = useFetch('/api/products/');
    console.log(data);
    const navigate = useNavigate();
    const handleClick = () => {
        // axios.delete('http://localhost:8080/api/products/' + productId)
        // .then(resp => {
        //     console.log('Resource deleted:', resp.data)
        // })
        // .catch(err => {
        //     console.error(err);
        // })
        fetch('http://localhost:8080/api/products/' + productId, {
            method: 'DELETE',
        }).then(() => {
            // navigate('/products');
            console.log('product deleted');
        }).catch(err => {
            console.error(err);
        });
    };
    return (
        <div>
            <Navbar/>
            
            <h1>All Products will be displayed here!!</h1>
            {
                data.map((product, index) => (
                    <li key={index}>
                        <Link key={product} to={`/products/${product.title}`}>
                            {product.title}
                        </Link>
                        <button onClick={handleClick}>delete</button>
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
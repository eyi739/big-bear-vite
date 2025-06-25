import { useParams } from "react-router";
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
// import UsernameForm from "../Profiles/UsernameForm";

export default function ShowPage(){
    const data = useFetch(`/api/products`);
    const {productId } = useParams();
    console.log(data);
    // console.log(params)
    return (
        <div>
            <h1>This is the Show Page ! For this parameter: /products/{productId}</h1>
            <h2>{productId}</h2>
            {/* <h2>{params.productId.title}</h2> */}
            {/* <h3>{data}</h3> */}
            {
                data.map((product, index) => (
                    <li key={index}>
                        <Link key={product._id} to={`/products/${product._id}`}>
                            {product.title}
                        </Link>
                        <p>
                            <Link to={`/products/${product._id}/edit`}>Edit</Link>
                        </p>
                    </li>
                    
                ))
            }
           <p>
            <Link to={`/products/${productId}/edit`}>Edit</Link>
           </p>
            <footer></footer>
            {/* <Outlet/> */}
        </div>
    )
}
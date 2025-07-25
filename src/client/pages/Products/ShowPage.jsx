import { useParams } from "react-router";
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
// import UsernameForm from "../Profiles/UsernameForm";

export default function ShowPage(){
    const { productId } = useParams();
    const data = useFetch(`/products/${productId}`);

    return (
        <div>
            <h1>This is the Show Page ! For this parameter: /products/{productId}</h1>   
            <h2>This is the product Id:{productId}</h2>
            <h3>Product Title: {data.title}</h3>
            <h4>Product Price: ${data.price}</h4>
            <h5>Product Category: {data.category}</h5>
            <img src={data.image} alt={data.title} />

            <footer><Link to={`/products/${productId}/edit`}>Edit</Link></footer>
            {/* <Outlet/> */}
        </div>
    )
}
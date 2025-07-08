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
            <h2>{productId}</h2>
            <button>delete</button>
            <footer><Link to={`/products/${productId}/edit`}>Edit</Link></footer>
            {/* <Outlet/> */}
        </div>
    )
}
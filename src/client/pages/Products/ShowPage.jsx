import { useParams } from "react-router";
import { Link } from "react-router-dom"
// import UsernameForm from "../Profiles/UsernameForm";

export default function ShowPage(){
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>This is the Show Page ! For this parameter: /products/{params.productId}</h1>
            <h2>{params.productId}</h2>
           <p>
            <Link to={`/products/${params.productId}/edit`}>Edit</Link>
           </p>
            <footer></footer>
            {/* <Outlet/> */}
        </div>
    )
}
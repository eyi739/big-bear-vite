import { useParams } from "react-router";
import UsernameForm from "../Profiles/UsernameForm";
export default function ShowPage(){
    const params = useParams();
    console.log(params);
    return (
        <div>
            <h1>This is the Show Page ! For this parameter: /products/{params.productId}</h1>
        </div>
    )
}
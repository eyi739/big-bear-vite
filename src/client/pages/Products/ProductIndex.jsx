import Navbar from "../../../Navbar"
import useFetch from "../../hooks/useFetch"

export default function ProductIndex(){
    const data = useFetch('/api/products');
    return (
        <div>
            <Navbar/>
            <h1>All Products will be displayed here!</h1>
            {data.map((item,index)=> (
                <li key={index}>{item}</li>
            ))}
        </div>
    )
}
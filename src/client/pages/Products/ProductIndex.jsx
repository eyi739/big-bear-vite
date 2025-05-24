import Navbar from "../../../Navbar"
import useFetch from "../../hooks/useFetch"

export default function ProductIndex(){
    const data = useFetch('/api/products');
    return (
        <div>
            <Navbar/>
            <h1>All Products will be displayed here</h1>
            <h2>{data}</h2>
        </div>
    )
}
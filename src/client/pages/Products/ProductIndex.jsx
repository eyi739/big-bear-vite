import Navbar from "../../../Navbar"

export default function ProductIndex(products){

    const productIndex = []
    for (let product of products){
        productIndex.push(<div key={product.id}>{product.title}</div>)
    }
    return (
        <div>
            <Navbar/>
            <h1>Products will be displayed here</h1>
            {productIndex}
            
        </div>
    )
}
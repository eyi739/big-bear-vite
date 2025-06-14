import { useState } from "react";
export default function UsernameForm() {
    const [product, setProduct] = useState("");
    const updateProduct = (evt) => {
        setProduct(evt.target.value);
    };

    return (
        <div>
            <h1>This is the make new product form</h1>
            <form action="/products" method="POST">
                <div>
                    <label htmlFor="product">Enter the product name:</label>
                    <input type="text" id="product" placeholder="enter product name" value={product} onChange={updateProduct}  />
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
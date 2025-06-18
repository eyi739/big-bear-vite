import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function EditProductPage() {
    // const [product, setProduct] = useState('');
    const [title, setTitle ] = useState('');
    const [price, setPrice ] = useState(0);
    const [category, setCategory ] = useState('fruit');
    const navigate = useNavigate();

    const updateProduct = (evt) => {
        setTitle(evt.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(title);
        const product = { title, price, category };
        console.log(product);
        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        }).then(()=> {
            console.log('new product added');
            navigate('/products');
        })
        
    }

    return (
        <div>
            <h1>This is the make new product form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Enter the product title:</label>
                    <input type="text" id="title" placeholder="enter product name" value={title} onChange={(evt) => setTitle(evt.target.value)}  />
                </div>
                <div>
                    <label htmlFor="price">Enter the product price:</label>
                    <input type="text" id="price" placeholder="enter product price" value={price} onChange={(evt) => setPrice(evt.target.value)}  />
                </div>
                <div>
                    <label htmlFor="category">Enter the product category:</label>
                    <select value={category} name="category" id="category" onChange={(evt) => setCategory(evt.target.value)}>
                        <option value="fruit">fruit</option>
                        <option value="vegetable">vegetable</option>
                        <option value="dairy">dairy</option>
                        <option value="meat">meat</option>
                        <option value="poultry">poultry</option>
                        <option value="canned goods">canned goods</option>
                    </select>
                    {/* <input type="text" id="category" placeholder="enter product category" value={category} onChange={(evt) => setCategory(evt.target.value)}  /> */}
                </div>
                <button>Submit</button>
                <p>{title}</p>
            </form>
            <Link to={'/'}>Go back to home</Link>
        </div>
    )
}
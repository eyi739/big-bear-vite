import { useState,  } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import axios from "axios";

export default function EditProductPage() {
    const {productId} = useParams();
    const data = useFetch('/api/products/' + productId);
    
    // console.log(data);

    const [title, setTitle ] = useState('');
    const [price, setPrice ] = useState(0);
    const [category, setCategory ] = useState('fruit');
   
    const navigate = useNavigate();
    
    // console.log('/api/products/' + product.id);
    // const data = useFetch('`http://localhost:8080/products/' + id)
    // const {data: title, price, category } = useFetch('http://localhost:8080/products/' 


    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const product = { title, price, category };
    //     console.log(product);
    //     fetch(`http://localhost:8080/products/${product._id}`, {
    //         method: 'PUT',
    //         // headers: {"Content-Type": "application/json"},
    //         // body: JSON.stringify(product)
    //     }).then(()=> {
    //         console.log('product has been edited');
    //         navigate('/products');
    //     });
    // }

    const handleClick = () => {
        // axios.delete('http://localhost:8080/api/products/' + productId)
        // .then(resp => {
        //     console.log('Resource deleted:', resp.data)
        // })
        // .catch(err => {
        //     console.error(err);
        // })
        fetch('http://localhost:8080/api/products/' + productId, {
            method: 'DELETE',
        }).then(() => {
            navigate('/products');
            console.log('product deleted');
        }).catch(err => {
            console.error(err);
        });
    };
    
    // const handleClick = () => {
    //     axios.delete(`/api/products/${id}`)
    //     .then(()=> {
    //         console.log('product has been deleted')
    //         navigate('/products');
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }

    return (
        <div>
            <h1>This is the product EDIT form for this product</h1>
            <form>
                <div>
                    <label htmlFor="title">Enter the product title:</label>
                    <input type="text" id="title" placeholder='placeholder' value={title} name="title" onChange={(evt) => setTitle(evt.target.value)}  />
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
                <button>Submit Edits</button>
                <button onClick={handleClick}>Delete</button>
                <p>{title}</p>
            </form>
            <Link to={'/'}>Go back to home</Link>
        </div>
    )
}
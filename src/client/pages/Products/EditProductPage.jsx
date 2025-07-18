import { useState,  } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import axios from "axios";

export default function EditProductPage() {
    const {productId} = useParams();
    const data = useFetch(`/products/${productId}`);
    console.log(data);
    const [formData, setFormData] = useState({title: '', price: 1, category: 'fruit'});

    // const [title, setTitle ] = useState('');
    // const [price, setPrice ] = useState(0);
    // const [category, setCategory ] = useState('fruit');
   
    const navigate = useNavigate();
    
    // console.log('/api/products/' + product.id);
    // const data = useFetch('`http://localhost:8080/products/' + id)
    // const {data: title, price, category } = useFetch('http://localhost:8080/products/' 


    const handleUpdateClick = (e) => {
        e.preventDefault();
        const { title, price, category } = formData;
        const product = { title, price, category };
        console.log(product);
        fetch('http://localhost:8080/api/products/' + productId, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product)
        }).then(()=> {
            console.log('product has been edited', product);
            navigate('/products');
        });
    }

    const handleChange = (evt) => {
        const changedField = evt.target.name;
        const newValue = evt.target.value;
        setFormData((currData) => {
            return {
                ...currData,
                [changedField]: newValue,
            }
            // currData[changedField] = newValue;
            // return {...currData}

        })
    }

    const handleDeleteClick = () => {
        fetch('http://localhost:8080/api/products/' + productId, {
            method: 'DELETE',
        }).then(() => {
            // navigate('/products');
            // put code to delete from front end 
            console.log('product deleted');
        }).catch(err => {
            console.error(err);
        });
    };

    return (
        <div>
            <h1>This is the product EDIT form for this product</h1>
            <h2>Data from {data.title} 
                <p>title: {data.title}, price: ${data.price}, category: {data.category},</p> 
               
            </h2>
            <form>
                <div>
                    <label htmlFor="title">Enter the product title:</label>
                    <input type="text" id="title" placeholder='title' value={formData.title} name="title" onChange={handleChange}  />
                </div>
                <div>
                    <label htmlFor="price">Enter the product price:</label>
                    <input type="text" id="price" placeholder="price" name="price" value={formData.price} onChange={handleChange}  />
                </div>
                <div>
                    <label htmlFor="category">Enter the product category:</label>
                    <select value={formData.category} name="category" id="category" onChange={handleChange}>
                        <option value="fruit">fruit</option>
                        <option value="vegetable">vegetable</option>
                        <option value="dairy">dairy</option>
                        <option value="meat">meat</option>
                        <option value="poultry">poultry</option>
                        <option value="canned goods">canned goods</option>
                    </select>
                    {/* <input type="text" id="category" placeholder="enter product category" value={category} onChange={(evt) => setCategory(evt.target.value)}  /> */}
                </div>
                <button onClick={handleUpdateClick}>Submit Edits</button>
                <button onClick={handleDeleteClick}>Delete</button>
                
            </form>
            <Link to={'/'}>Go back to home</Link>
        </div>
    )
}
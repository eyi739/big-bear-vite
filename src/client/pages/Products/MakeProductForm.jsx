import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import useFetch from "../../hooks/useFetch"

export default function MakeProductForm() {
    const navigate = useNavigate();
    const {productId} = useParams();
    const [formData, setFormData] = useState({title: '', price: 1, category: 'fruit'});
    const [isPending, setIsPending] = useState(false);

    const data = useFetch(`/products/${productId}`);

    // const [title, setTitle ] = useState('');
    // const [price, setPrice ] = useState(0);
    // const [category, setCategory ] = useState('fruit');

    const categories = ['fruit', 'vegetable','poultry', 'dairy', 'meat', 'canned goods'];
    
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm();

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

    const originalHandleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true)

        const product = { title, price, category };

        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(product),
        }).then(()=> {
            navigate('/');
            
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            <Typography variant="h1" sx={{textAlign: "center"}}>Add New Product</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(originalHandleSubmit)}
                sx={{
                    maxWidth: 400,
                    mx: 'auto',
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
            <TextField
                label="Title"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
                onChange={handleChange}
            />

            <TextField
                label="Price"
                type="number"
                inputProps={{ step: '0.01' }}
                {...register('price', {
                required: 'Price is required',
                min: { value: 0.01, message: 'Price must be positive' },
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                fullWidth
                onChange={handleChange}
            />

            <FormControl fullWidth error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
            defaultValue=""
            {...register('category', { required: 'Category is required' })}
            >
            {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                {cat}
                </MenuItem>
                ))}
            </Select>
            </FormControl>
                {!isPending && <Button type="submit" variant="contained">Add New Product</Button>}
                {isPending && <Button type="submit" variant="contained" disabled>Adding New Product..</Button>}
            <Button type="submit" variant="contained">
                Submit
            </Button>
                <Link to={'/products'}>
                    Go back to all products
                </Link>
            </Box>
        </div>
        
  );
        // <div>
        //     <h1>This is the make new product form</h1>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="title">Enter the product title:</label>
        //             <input type="text" id="title" placeholder="enter product name" value={title} onChange={(evt) => setTitle(evt.target.value)}  />
        //         </div>
        //         <div>
        //             <label htmlFor="price">Enter the product price:</label>
        //             <input type="text" id="price" placeholder="enter product price" value={price} onChange={(evt) => setPrice(evt.target.value)}  />
        //         </div>
        //         <div>
        //             <label htmlFor="category">Enter the product category:</label>
        //             <select value={category} name="category" id="category" onChange={(evt) => setCategory(evt.target.value)}>
        //                 <option value="fruit">fruit</option>
        //                 <option value="vegetable">vegetable</option>
        //                 <option value="dairy">dairy</option>
        //                 <option value="meat">meat</option>
        //                 <option value="poultry">poultry</option>
        //                 <option value="canned goods">canned goods</option>
        //             </select>
        //             {/* <input type="text" id="category" placeholder="enter product category" value={category} onChange={(evt) => setCategory(evt.target.value)}  /> */}
        //         </div>
        //         {!isPending && <button>Add New Product</button>}
        //         {isPending && <button disabled>Adding New Product..</button>}
        //     </form>
        //     <footer>
               
        //     </footer>
        // </div>
    
}
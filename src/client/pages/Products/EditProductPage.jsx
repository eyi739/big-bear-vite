import { useState, useEffect  } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import useFetch from "../../hooks/useFetch"

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const categories = ['fruit', 'vegetable','poultry', 'dairy', 'meat', 'canned goods'];

export default function EditProductPage() {
  const [ localImage, setLocalImage ] = useState(null)
  const { productId } = useParams();
  const data = useFetch(`/products/${productId}`);
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalImage(URL.createObjectURL(file))
      setValue('image', '')
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // When fetch completes, populate form fields
  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("price", data.price);
      setValue("category", data.category);
    }
  }, [data, setValue]);

const onSubmit = async (formData) => {
    console.log("Submitted formData:", formData);
    try {
        const res = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Server error:", errorData);
      return;
    }
    navigate("/products");
  } catch (err) {
    console.error("Network error:", err);
  }
};

  const handleDeleteClick = () => {
    fetch(`http://localhost:8080/api/products/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log("product deleted");
        navigate("/products");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>Edit Product</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label=""
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
          fullWidth
        />

        <TextField
          label=""
          type="number"
          inputProps={{ step: "0.01" }}
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be positive" },
          })}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />

<Typography variant="body2" color="text.secondary">Image URL or Upload</Typography>

<TextField
  label="Image URL"
  {...register('image', {
    validate: value => {
      if (!value && !localImage) return 'Image is required';
      if (value && !/^https?:\/\/.+/i.test(value)) return 'Enter a valid image URL';
      return true;
    }
  })}
  error={!!errors.image}
  helperText={errors.image?.message}
  fullWidth
  disabled={!!localImage} // disable if local file is chosen
/>

<input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  disabled={!!watch("image")} // disable if image URL is filled
/>
  {(watch("image") || localImage) && (
  <img
    src={localImage || watch("image")}
    alt="Preview"
    style={{ maxWidth: '100%', maxHeight: 300 }}
    onError={(e) => {
      e.target.style.display = 'none';
    }}
  />
)}
    <FormControl fullWidth error={!!errors.category}>
    <InputLabel>Category</InputLabel>
    <Controller
        name="category"
        control={control}
        defaultValue=""
        rules={{ required: "Category is required" }}
        render={({ field }) => (
            <Select {...field} label="Category">
                {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                    {cat}
                </MenuItem>
                ))}
            </Select>
        )}
  />
</FormControl>

        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Submit Edits
        </Button>

        <Button onClick={handleDeleteClick} variant="outlined" color="error">
          Delete Product
        </Button>

        <Link to="/products">Go back to all products</Link>
      </Box>
    </div>
  );
}
        // <div>
        //     <h1>This is the product EDIT form for this product</h1>
        //     <h2>Data from {data.title} 
        //         <p>title: {data.title}, price: ${data.price}, category: {data.category},</p> 
               
        //     </h2>
        //     <form>
        //         <div>
        //             <label htmlFor="title">Enter the product title:</label>
        //             <input type="text" id="title" placeholder='title' value={formData.title} name="title" onChange={handleChange}  />
        //         </div>
        //         <div>
        //             <label htmlFor="price">Enter the product price:</label>
        //             <input type="text" id="price" placeholder="price" name="price" value={formData.price} onChange={handleChange}  />
        //         </div>
        //         <div>
        //             <label htmlFor="category">Enter the product category:</label>
        //             <select value={formData.category} name="category" id="category" onChange={handleChange}>
        //                 <option value="fruit">fruit</option>
        //                 <option value="vegetable">vegetable</option>
        //                 <option value="dairy">dairy</option>
        //                 <option value="meat">meat</option>
        //                 <option value="poultry">poultry</option>
        //                 <option value="canned goods">canned goods</option>
        //             </select>
        //             {/* <input type="text" id="category" placeholder="enter product category" value={category} onChange={(evt) => setCategory(evt.target.value)}  /> */}
        //         </div>
        //         <button onClick={handleUpdateClick}>Submit Edits</button>
        //         <button onClick={handleDeleteClick}>Delete</button>
                
        //     </form>
        //     <Link to={'/'}>Go back to home</Link>
        // </div>
    
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, Link, } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

const categories = ['fruit', 'vegetable','poultry', 'dairy', 'meat', 'canned goods'];

export default function MakeProductForm() {
    const navigate = useNavigate();
    const [ localImage, setLocalImage ] = useState(null)

    const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    control,
    watch,
    setError,
    } = useForm();

    // const handleChange = (evt) => {
    //     const changedField = evt.target.name;
    //     const newValue = evt.target.value;
    //     setFormData((currData) => {
    //         return {
    //             ...currData,
    //             [changedField]: newValue,
    //         }
    //     })
    // }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLocalImage(URL.createObjectURL(file));
            // Clear image URL input if a file is chosen
            setValue('image', '');
        }
    };

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            });

            if (!res.ok) {
                const result = await res.json();

                if (result.errors) {
                    for (let field in result.errors) {
                    setError(field, {
                        type: "server",
                        message: result.errors[field],
                    });
                    }
                } else {
                    throw new Error(result.error || "Something went wrong");
                }

                return;
                }

                // On success, navigate
                navigate("/products");
            } catch (err) {
                alert(err.message);
            }
            };

    return (
        <div>
            <Typography variant="h1" sx={{textAlign: "center"}}>Add New Product</Typography>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
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
            <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.category}>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" {...field}>
                        {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                            {cat}
                        </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                )}
            />

            <TextField
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message}
                fullWidth
            />

            <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add New Product'}
            </Button>
              
            <Link to="/products" style={{ textAlign: 'center', textDecoration: 'underline', color: 'blue' }}>
                Go back to all products
            </Link>

            </Box>
        </div>
        
  )};


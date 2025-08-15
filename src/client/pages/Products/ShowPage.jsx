import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../hooks/useFetch";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const categories = ["fruit", "vegetable", "poultry", "dairy", "meat", "canned goods"];

export default function EditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, error, isPending } = useFetch(`/api/products/${productId}`);

  const [localImage, setLocalImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
    },
  });

  // Pre-fill form once product data is loaded
  useEffect(() => {
    if (data) {
      reset({
        title: data.title || "",
        price: data.price || "",
        category: data.category || "",
        description: data.description || "",
        image: data.image || "",
      });
      setLocalImage(null);
    }
  }, [data, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalImage(URL.createObjectURL(file));
      setValue("image", ""); // clear image URL if uploading a file
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData };

      // If uploading a file, handle separately (you may need FormData)
      if (localImage) {
        console.warn("File upload not implemented in this example.");
      }

      const res = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Failed to delete product:", errorData);
        return;
      }
      navigate("/products");
    } catch (err) {
      console.error("Network error while deleting:", err);
    }
  };

  if (isPending) return <p>Loading product...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center" }}>Edit Product</Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 400, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
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
          {...register("price", { required: "Price is required", min: { value: 0.01, message: "Price must be positive" } })}
          error={!!errors.price}
          helperText={errors.price?.message}
          fullWidth
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          {...register("description")}
          fullWidth
        />

        <Typography variant="body2" color="text.secondary">Image URL or Upload</Typography>

        <TextField
          label="Image URL"
          {...register("image", {
            validate: (value) => {
              if (!value && !localImage) return "Image is required";
              if (value && !/^https?:\/\/.+/i.test(value)) return "Enter a valid image URL";
              return true;
            },
          })}
          error={!!errors.image}
          helperText={errors.image?.message}
          fullWidth
          disabled={!!localImage}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} disabled={!!watch("image")} />

        {(watch("image") || localImage) && (
          <img
            src={localImage || watch("image")}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: 300 }}
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        <FormControl fullWidth error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select {...field} label="Category">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Button type="submit" variant="contained" disabled={isSubmitting}>Submit Edits</Button>
        <Button onClick={handleDeleteClick} variant="outlined" color="error">Delete Product</Button>
        <Link to="/products">Go back to all products</Link>
      </Box>
    </div>
  );
}

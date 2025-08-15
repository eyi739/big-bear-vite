import useFetch from "../../hooks/useFetch";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";

export default function ProductIndex() {
  const { data, error, isPending } = useFetch("/api/products/");

  if (isPending) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error.message}</p>;
  if (!Array.isArray(data) || data.length === 0) return <p>No products found.</p>;

  return (
    <div>
      <CssBaseline />
      <Typography variant="h3" sx={{ textAlign: "center", my: 4 }}>
        All Products
      </Typography>

      <Grid container spacing={4} sx={{ px: 2 }}>
        {data.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image || "/placeholder.png"} // fallback image
                alt={product.title || "No title"}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h6">{product.title}</Typography>
                <Typography color="text.secondary">${product.price}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Link to={`/products/${product._id}`} style={{ marginTop: "8px" }}>
                  View Details
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";

export default function ShowPage() {
  const navigate = useNavigate();
  const { productId } = useParams();

  // ✅ Correct destructuring from useFetch
  const { data: product, error, isPending } = useFetch(`/api/products/${productId}`);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [reviewBody, setReviewBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ✅ Helper for image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("/uploads/")) {
      return `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"}${imagePath}`;
    }
    return imagePath; // already a full URL
  };

  useEffect(() => {
    if (product?.reviews) {
      setReviews(product.reviews);
    }
  }, [product]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
      if (res.ok) navigate("/products");
      else console.error("Failed to delete product");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review: { rating, body: reviewBody } }),
      });
      if (res.ok) {
        const updatedProduct = await res.json();
        setReviews(updatedProduct.reviews);
        setRating(1);
        setReviewBody("");
      } else {
        console.error("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Handle loading state
  if (isPending) {
    return <Typography>Loading product...</Typography>;
  }

  // ✅ Handle error state
  if (error) {
    return <Typography color="error">Error: {error.message}</Typography>;
  }

  // ✅ Handle no product found
  if (!product) {
    return <Typography>No product found.</Typography>;
  }

  return (
    <Box sx={{ display: "flex", my: 10, mx: 10 }}>
      <CardMedia
        component="img"
        height="500"
        image={getImageUrl(product.image)}
        alt={product.title}
        sx={{
          objectFit: "contain",
          objectPosition: "center",
          ml: "auto",
        }}
      />

      <Box sx={{ maxWidth: 2000, mx: "auto", mt: 10 }}>
        <Card sx={{ width: "100%", height: "100%", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              ${product.price}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Description: {product.description}
            </Typography>

            {/* Review Form */}
            <Box
              component="form"
              onSubmit={handleReviewSubmit}
              sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <Typography variant="h6">Leave a Review</Typography>
              <Rating
                name="review-rating"
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
              />
              <TextField
                label="Your review"
                multiline
                rows={3}
                value={reviewBody}
                onChange={(e) => setReviewBody(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={submitting || !reviewBody.trim()}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
            </Box>

            {/* Reviews */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>
              {reviews.length > 0 ? (
                reviews.map((rev, idx) => (
                  <Box
                    key={idx}
                    sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
                  >
                    <Rating value={rev.rating} readOnly size="small" />
                    <Typography variant="body2">{rev.body}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reviews yet.
                </Typography>
              )}
            </Box>

            {/* Actions */}
            <Box mt={3} display="flex" gap={2}>
              <Button variant="contained" component={Link} to={`/products/${productId}/edit`}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="text" component={Link} to="/products">
                Back to Products
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

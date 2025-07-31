import { useParams } from "react-router";
import { Link, useNavigate, useLoaderData } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
// import UsernameForm from "../Profiles/UsernameForm";



export default function ShowPage(){
    const navigate = useNavigate();
    const product = useLoaderData();
    const { productId } = useParams();
    const data = useFetch(`/products/${productId}`);

    const handleDelete = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        navigate('/products');
      } else {
        console.error('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
    }
  };

    return (
      <Box>
        <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 10 }}>      
          <Card 
            sx={{
              width: '30%',
              height: '100%',
              objectFit: 'cover', // or contain
              borderRadius: 2,
              display: 'block',
              mx: 'auto',         // horizontal centering
            }}
          >
            <CardMedia
            component="img"
            height="300"
            image={data.image}
            alt={data.title}
            sx={{
                objectFit: "cover",
                objectPosition: "right center",
                }}
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {data.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                ${data.price}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Category: {data.category}
              </Typography>

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
    )
}
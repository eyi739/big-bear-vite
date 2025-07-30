import { useParams } from "react-router";
import { Link } from "react-router-dom"
import useFetch from "../../hooks/useFetch"

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
// import UsernameForm from "../Profiles/UsernameForm";

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

export default function ShowPage(){
    const { productId } = useParams();
    const data = useFetch(`/products/${productId}`);
    <CardMedia
        component="img"
        height="300"
        image={data.image}
        alt={data.title}
        sx={{
            objectFit: "cover",
            objectPosition: "left center",
            }}
        />
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 10 }}>
            
      <Card>
        <CardMedia
        component="img"
        height="300"
        image={data.image}
        alt={data.title}
        sx={{
            objectFit: "cover",
            objectPosition: "left center",
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
      {/* <footer><Link to={`/products/${productId}/edit`}>Edit</Link></footer> */}
    </Box>
        // <div>
        //     <h1>This is the Show Page ! For this parameter: /products/{productId}</h1>   
        //     <h2>This is the product Id:{productId}</h2>
        //     <h3>Product Title: {data.title}</h3>
        //     <h4>Product Price: ${data.price}</h4>
        //     <h5>Product Category: {data.category}</h5>
        //     <img src={data.image} alt={data.title} />

        //     <footer><Link to={`/products/${productId}/edit`}>Edit</Link></footer>
        //     {/* <Outlet/> */}
        // </div>
    )
}
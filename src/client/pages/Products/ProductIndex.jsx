import useFetch from "../../hooks/useFetch";

import CssBaseline from "@mui/material/CssBaseline";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import { Link, useNavigate } from "react-router-dom";

export default function ProductIndex(){
    const data = useFetch('/api/products/');
    const navigate = useNavigate();
    return (
        <div>
            <CssBaseline/>
            <Typography variant="h1">All Products will be displayed here!!</Typography>
            <Grid container direction="row" sx={{ mx: 'auto', justifyContent: 'flex-end', }} >
                {data.map((product, index) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} sx={{px: 2}}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="160"
                            image={product.image}
                            alt={product.title}
                        />
                        <CardContent 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',  // horizontal centering
                                justifyContent: 'center', // vertical centering if needed
                            }}
                        >
                            <Typography variant="h6">{product.title}</Typography>
                            <Typography color="text.secondary">${product.price}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category: {product.category}
                            </Typography>
                            <Link to={`/products/${product.id}`}>
                                {product.title}
                            </Link>
                        </CardContent>
                    </Card>
                </Grid>

                    // <li key={product.id} data-id={product.id}>
                    //     <Link to={`/products/${product.id}`}>
                    //         {product.title}
                    //     </Link>
                    // </li>
                ))}
            </Grid>

        </div>
    )
}
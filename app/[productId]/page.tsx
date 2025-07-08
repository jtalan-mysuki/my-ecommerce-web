"use client";
import { RootState } from "@/services/Stored";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function page({ params }: { params: { productId: string } }) {
  const productId = parseInt(params.productId);
  const product = useSelector((state: RootState) =>
    state.shoppingCart.products.find((p) => p.id === productId)
  );
  console.log(product);

  if (!product) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Category: {product.category}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary">
            ₱{product.price.toFixed(2)}
          </Typography>
          <Rating value={product.rating.rate} precision={0.1} readOnly />
          <Typography variant="caption" display="block">
            {product.rating.count} reviews
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

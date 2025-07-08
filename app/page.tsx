"use client";

import AppBar from "@/components/app-bar";
import ItemCard from "@/components/card-item";
import { Box, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/Stored";
import { setProducts } from "@/services/slices/shopping-cart";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const { products } = useSelector((state: RootState) => state.shoppingCart);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        if (response.status === 200) {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Products</Typography>
      </Box>
      <Grid container spacing={2}>
        {loading
          ? "Loading"
          : products.map((item) => (
              <Grid key={item.id} size={3}>
                <ItemCard {...item} />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}

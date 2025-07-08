"use client";

import React, { useMemo } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/services/Stored";
import {
  removeFromCart,
  setCart,
  decreaseCartQuantity,
} from "@/services/slices/shopping-cart";
import { Divider } from "@mui/material";

export default function ShoppingCartList() {
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  const totalPrice: number = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        mx: "auto",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Your Cart
      </Typography>
      <List>
        {cart.length === 0 ? (
          <Typography sx={{ px: 2, py: 1 }}>Your cart is empty.</Typography>
        ) : (
          cart.map((item, index) => (
            <ListItem
              key={index}
              alignItems="flex-start"
              secondaryAction={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    edge="end"
                    aria-label="decrease"
                    onClick={() => dispatch(decreaseCartQuantity(item.id))}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography>{item.quantity}</Typography>

                  <IconButton
                    edge="end"
                    aria-label="increase"
                    onClick={() =>
                      dispatch(
                        setCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          description: item.description,
                          image: item.image,
                          quantity: 1, // will be ignored by reducer logic
                        })
                      )
                    }
                  >
                    <AddIcon />
                  </IconButton>

                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar alt={item.title} src={item.image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={`₱${item.price.toFixed(2)} × ${item.quantity}`}
              />
            </ListItem>
          ))
        )}
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1" fontWeight="bold">
            ₱{totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </List>
    </Box>
  );
}

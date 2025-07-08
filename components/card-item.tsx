"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { useRouter } from "next/navigation";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { ItemCardViewProps, setCart } from "@/services/slices/shopping-cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/services/Stored";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function ItemReviewCard({
  id,
  title,
  price,
  description,
  category,
  image,
}: ItemCardViewProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToCart = () => {
    dispatch(
      setCart({
        id,
        title,
        price,
        description,
        image,
        quantity: 0,
      })
    );
  };

  return (
    <Card key={id} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {category.toLocaleUpperCase()}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ cursor: "pointer", color: "primary.main" }}
          onClick={() => router.push(`/${id}`)}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          PHP {price}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={handleAddToCart}
        >
          <AddShoppingCartIcon />
        </IconButton>

        <ExpandMore
          color="primary"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Description:</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

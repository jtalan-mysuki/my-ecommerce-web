"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  Badge,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/Stored";
import { setSearchValue } from "@/services/slices/shopping-cart";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters, products } = useSelector(
    (state: RootState) => state.shoppingCart
  );
  return (
    <Stack gap={1} direction="row">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={filters.search}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>

      <FormControl
        sx={{
          width: 200,
          "& .MuiInputLabel-root": { color: "white" },
          "& .MuiSelect-root": { color: "white" },
          "& .MuiSvgIcon-root": { color: "white" },
        }}
        size="small"
      >
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sort By"
          value={filters.desc}
        >
          {[...new Set(products.map((obj) => obj.category))].map((category) => (
            <MenuItem value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default function SearchAppBar() {
  const router = useRouter();
  const { cart } = useSelector((state: RootState) => state.shoppingCart);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={() => router.push("/")}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MY SUKI
          </Typography>

          <Filters />

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="cart"
            onClick={() => router.push("/cart")}
          >
            <Badge badgeContent={cart?.length} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemCardViewProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
};

type InitialStateProps = {
  filters: {
    search: string;
    desc: string;
  };
  cart: CartProps[];
  products: ItemCardViewProps[];
};

const loadCartFromStorage = (): CartProps[] => {
  if (typeof window !== "undefined") {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
  return [];
};
export const persistCartToLocalStorage = (cart: CartProps[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState: InitialStateProps = {
  filters: {
    search: "",
    desc: "",
  },
  cart: loadCartFromStorage(),
  products: [],
};

export const shoppingCartSlice = createSlice({
  name: "shopping-cart",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.filters.search = action.payload;
    },
    setDescription: (state, action) => {
      state.filters.desc = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCart: (state, action: PayloadAction<CartProps>) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      persistCartToLocalStorage(state.cart);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      persistCartToLocalStorage(state.cart);
    },
    decreaseCartQuantity: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
  },
});

export const {
  setSearchValue,
  setDescription,
  setProducts,
  setCart,
  removeFromCart,
  decreaseCartQuantity,
} = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import shoppingCartSlice from "./slices/shopping-cart";

export const stored = configureStore({
  reducer: {
    shoppingCart: shoppingCartSlice,
  },
});

export type AppStore = typeof stored;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

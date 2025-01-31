import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "@/features/apiSlice";
import authReducer from "@/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: import.meta.env.VITE_ENV !== "PROD",
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

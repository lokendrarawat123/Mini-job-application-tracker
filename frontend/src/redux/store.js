import { configureStore } from "@reduxjs/toolkit";
import { indexSlice } from "./features/indexSlice"; // तपाईंको indexSlice को सही पाथ (path) राख्नुहोस्

const store = configureStore({
  reducer: {

    [indexSlice.reducerPath]: indexSlice.reducer,
  },
  // २. indexSlice को मिडलवेयर यहाँ जोड्ने (यसले क्यासिङ र टाइमिङ म्यानेज गर्छ)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexSlice.middleware),
});

export default store;

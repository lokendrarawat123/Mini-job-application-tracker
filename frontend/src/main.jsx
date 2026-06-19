import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 🌟 १. Redux Provider र Store इम्पोर्ट गर्ने
import { Provider } from "react-redux";
import store from "./redux/store"; // आफ्नो store को सही पाथ मिलाउनुहोस्

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🌟 २. यहाँ Provider भित्र App लाई राख्ने */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx"; 
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </div>
);

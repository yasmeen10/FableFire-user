import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
  <AuthProvider>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </AuthProvider>
  </div>
);

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </div>
);

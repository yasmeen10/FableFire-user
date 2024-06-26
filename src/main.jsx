import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext.jsx";
import { UsedItemProvider } from "./context/UsedItemContext.jsx";
import { EventProvider } from "./context/EventContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <BrowserRouter>
      <AuthProvider>
        <UsedItemProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <EventProvider>
                  <App />
                </EventProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </UsedItemProvider>
      </AuthProvider>
    </BrowserRouter>
  </div>
);

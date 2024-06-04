import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { OrderSummaryProvider } from "./context/OrderSummaryContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <AuthProvider>
    <OrderSummaryProvider>
    <App />
    </OrderSummaryProvider>
    </AuthProvider>

   
  </div>
);




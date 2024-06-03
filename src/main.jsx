import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { OrderSummaryProvider } from "./context/OrderSummaryContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <OrderSummaryProvider>
      <App />
    </OrderSummaryProvider>
  </div>
);

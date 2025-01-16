// src/main.jsx
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ApiProvider from "./context/ApiProvider.jsx";


const root = ReactDOM.createRoot(document.getElementById("root")).render(
  <ApiProvider>
    {/* <BrowserRouter basename="/DGX_Community/"> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
);
root.render(<App />);


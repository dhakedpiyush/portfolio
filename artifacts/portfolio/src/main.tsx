import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Always start at the top on a fresh page load
history.scrollRestoration = "manual";
window.scrollTo(0, 0);

createRoot(document.getElementById("root")!).render(<App />);

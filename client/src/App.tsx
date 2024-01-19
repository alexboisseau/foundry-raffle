import { RafflePage } from "./pages/RafflePage/RafflePage";
import { Toaster } from "react-hot-toast";

export const App = () => (
  <main className="app">
    <RafflePage />
    <Toaster
      toastOptions={{
        className: "toast",
      }}
    />
  </main>
);

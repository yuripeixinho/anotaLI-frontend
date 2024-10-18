import { RouterProvider } from "react-router-dom";
import "./App.scss";
import router from "./routes/routes";
import { AuthProvider } from "./context/anotaLiAuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

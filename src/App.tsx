import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

// Page Imports
import { Home } from "./pages/Home/Home";
import {CA} from "./pages/CAs/CA";
import NotFound from "./pages/404/NotFound";
import { ReadOnlyCA } from "./pages/CAs/ReadOnlyCA";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/ca", element: <CA /> },
  { path: "/ca/:userID", element: <ReadOnlyCA /> },
];

const client = new QueryClient()

const App = () => {
  return(<QueryClientProvider client = {client}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((route, index) => (
            <Route
              key={"public-" + index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </QueryClientProvider>)
}

export default App
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";

// Page Imports
import { Home } from "./pages/Home/Home";
import { CA } from "./pages/CAs/CA";
import NotFound from "./pages/404/NotFound";
import { ReadOnlyCA } from "./pages/CAs/ReadOnlyCA";
import Layout from "./components/layout";

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/ca", element: <CA /> },
  { path: "/ca/:userID", element: <ReadOnlyCA /> },
];

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
              {publicRoutes.map((route, index) => (
                <Route
                  key={"public-" + index}
                  path={route.path}
                  element={[<Layout>{route.element}</Layout>]}
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

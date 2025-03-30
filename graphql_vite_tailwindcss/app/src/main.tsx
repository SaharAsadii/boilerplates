import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthProvider } from "./context/auth-context.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login.tsx";
import Register from "./components/register.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <App />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);

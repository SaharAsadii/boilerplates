import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { Header } from "@/components";
import { AuthProvider } from "./context/auth-context";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <ToastContainer />
          <div className="min-h-screen bg-background font-sans antialiased">
            <Header />
            <main className="container mx-auto mt-16 px-4">
              <AppRoutes />
            </main>
          </div>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;

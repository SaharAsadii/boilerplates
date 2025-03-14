import type React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Button } from "./button";
import { useAuth } from "@/context/auth-context";

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  return (
    <>
      <header className="bg-primary text-primary-foreground fixed top-0 w-full z-10 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="md:text-2xl text-lg font-bold">
            Event Platform
          </Link>
          <nav className="flex items-center">
            {isAuthenticated ? (
              <>
                <p className="mx-4 flex items-center">
                  <User />
                  {user?.name}
                </p>

                <LogOut className="cursor-pointer" onClick={logout} />
              </>
            ) : (
              <>
                <Link
                  to={`/login?redirectTo=${location.pathname}`}
                  className="mr-4"
                >
                  <Button>Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <div className="flex items-center justify-center pt-20 shadow-md space-x-8 py-4 text-sm md:text-base">
        <Link to="/" className="border-b-2 border-b-primary text-primary">
          Upcoming Events
        </Link>
        <Link
          to="/create-event"
          className="border-b-2 border-b-primary text-primary"
        >
          Create Event
        </Link>
        <Link
          to="/my-events"
          className="border-b-2 border-b-primary text-primary"
        >
          My Events
        </Link>
      </div>
    </>
  );
};

export { Header };

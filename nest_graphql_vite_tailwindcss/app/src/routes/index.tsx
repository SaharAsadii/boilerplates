import Home from "../features/events/event-list";
import Login from "../features/auth/login/login";
import Register from "../features/auth/register/register";
import CreateEvent from "../features/events/create-event";
import EventDetails from "../features/events/event-details";
import MyEvents from "../features/events/my-events";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/my-events" element={<MyEvents />} />
    </Routes>
  );
};

export default AppRoutes;

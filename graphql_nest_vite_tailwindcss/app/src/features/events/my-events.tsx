import type React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Loader, Calendar, User, Frown } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Title } from "@/components";
import { GET_MY_EVENTS } from "./events.slice";
import { EventType } from "./events.types";

const MyEvents: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const { loading, error, data } = useQuery(GET_MY_EVENTS, {
    skip: !isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <p className="mt-24 text-center text-primary">
        Please log in to view the events.
      </p>
    );
  }

  if (loading) return <Loader className="animate-spin mx-auto mt-24" />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-24">Error: {error.message}</p>
    );

  const { myEvents } = data;

  return (
    <div className="max-w-screen-xl mx-auto px-4 pb-8">
      <Title>My Events</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myEvents?.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center w-full">
            <Frown className="mx-auto my-4" size={64} />
            <p className="text-center text-xl">No events found</p>
          </div>
        ) : (
          myEvents.map((event: EventType) => (
            <div
              key={event._id}
              className={`p-6 rounded-lg overflow-hidden shadow-lg`}
            >
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex items-center justify-between">
                <p className="text-gray-500 mb-2">
                  <Calendar className="inline-block mr-2" size={16} />
                  Date: {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-500 mb-4">
                  <User className="inline-block mr-2" size={16} />
                  RSVPs: {event.rsvps.length}
                </p>
              </div>
              <p className="text-gray-500 mb-2">
                Status: {event.isFrozen ? "Frozen" : "Open"}
              </p>
              <Link
                to={`/event/${event._id}`}
                className={`w-full flex justify-center mt-4 text-white px-4 py-2 rounded transition duration-300 ${
                  event.isFrozen
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyEvents;

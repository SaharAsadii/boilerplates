import { Card, Title } from "@/components";
import { useQuery } from "@apollo/client";
import { Frown, Loader } from "lucide-react";
import React from "react";
import { GET_EVENTS } from "./events.slice";
import { EventType } from "./events.types";

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <Loader className="animate-spin mx-auto my-10" />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 pb-8">
      <Title>Upcoming Events</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.events?.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center w-full">
            <Frown className="mx-auto my-4" size={64} />
            <p className="text-center text-xl">No events found</p>
          </div>
        ) : (
          data.events.map((event: EventType) => <Card event={event} />)
        )}
      </div>
    </div>
  );
};

export default Home;

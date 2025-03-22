export type CreateEventType = {
  title: string;
  description: string;
  date: string;
};

export type EventType = {
  _id: string;
  title: string;
  description: string;
  date: string;
  rsvps: {
    _id: string;
    user: { _id: string; name: string };
    status: string;
  }[];
  isFrozen: boolean;
  organizer: { name: string };
};

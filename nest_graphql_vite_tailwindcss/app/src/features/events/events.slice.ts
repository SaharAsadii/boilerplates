import { gql } from "@apollo/client";

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent(
    $title: String!
    $description: String!
    $date: DateTime!
  ) {
    createEvent(
      createEventInput: {
        title: $title
        description: $description
        date: $date
      }
    ) {
      _id
      title
      description
      date
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      _id
      title
      description
      date
      organizer {
        _id
        name
      }
      rsvps {
        _id
        user {
          _id
          name
        }
        status
      }
      isFrozen
    }
  }
`;

export const CREATE_RSVP_MUTATION = gql`
  mutation CreateRSVP($eventId: ID!, $status: String!) {
    createRSVP(createRSVPInput: { eventId: $eventId, status: $status }) {
      _id
      status
    }
  }
`;

export const UPDATE_RSVP_MUTATION = gql`
  mutation UpdateRSVP($id: ID!, $status: String!) {
    updateRSVP(updateRSVPInput: { id: $id, status: $status }) {
      _id
      status
    }
  }
`;

export const FREEZE_EVENT_MUTATION = gql`
  mutation FreezeEvent($id: ID!) {
    freezeEvent(id: $id) {
      _id
      isFrozen
    }
  }
`;

export const GET_MY_EVENTS = gql`
  query GetMyEvents {
    myEvents {
      _id
      title
      description
      date
      rsvps {
        _id
        user {
          _id
        }
        status
      }
      isFrozen
    }
  }
`;

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      _id
      title
      description
      date
      organizer {
        name
      }
    }
  }
`;

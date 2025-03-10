import { Application } from "express";
import { AgentLog, Log } from "src/models";
import { EVENT_TYPES } from "src/utils/constants";

export const events = (app: Application): void => {
  Object.values(EVENT_TYPES).forEach((event) => {
    app.on(event, ({ ...rest }: object) => {
      if (
        (
          rest as unknown as {
            event: EVENT_TYPES;
            agent?: string;
            user?: string;
            comment: string;
          }
        ).agent
      ) {
        AgentLog.create({ ...rest, eventType: event }).catch((error) => {
          console.error(error);
        });

        return;
      } else {
        Log.create({ ...rest, eventType: event }).catch((error) => {
          console.error(error);
        });
      }

      return;
    });
  });
};

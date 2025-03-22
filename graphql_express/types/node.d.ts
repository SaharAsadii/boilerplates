interface Pagination {
  next?: { page: number; limit: number };
  prev?: { page: number; limit: number };
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: number;
      PWD: string;
      MONGO_URI: string;
      REDIS_URI: string;
      REDIS_PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRE: string;
      JWT_REDIS_EXPIRE: string;
      JWT_SECRET_CUSTOMER: string;
      USER_PHOTO_DIRECTORY: string;
      CATEGORY_PHOTO_DIRECTORY: string;
      TASK_ALBUM_DIRECTORY: string;
      AGENT_FILE_DIRECTORY: string;
      ASIATECHIN_KAVEHNEGAR_API: string;
      ASIATECHIN_KAVEHNEGAR_NUMBER: string;
      KAVEHNEGAR_SEND_SMS_ENDPOINT: string;
      SENTRY_DSN: string;
      SENTRY_ENVIRONMENT: string;
      INTERNAL_SERVER_URL: string;
      INTERNAL_SERVER_HASH: string;
    }
  }
  namespace Express {
    interface Response {
      advancedResults: {
        count: number;
        pagination: Pagination;
        data: object[];
        total: number;
      };
      statistics: {
        [key in string]: unknown;
      };
    }
  }
}

export {};

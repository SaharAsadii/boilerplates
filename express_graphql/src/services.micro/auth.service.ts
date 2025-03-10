import { asyncServiceHandler } from "src/middleware";
import { UserDocument } from "src/types";
import { config } from "src/utils/constants";

interface SaveUserType {
  redis: typeof global.redis;
  user: UserDocument;
}

export const saveUserOnRedis = asyncServiceHandler(
  async ({ redis, user }: SaveUserType): Promise<void> => {
    redis.setEx(
      `user-sell:${user._id}`,
      +config.JWT.JWT_REDIS_EXPIRE ?? 86400,
      JSON.stringify(user)
    );
  }
);

export const deleteUserOnRedis = asyncServiceHandler(
  async ({ redis, user }: SaveUserType): Promise<void> => {
    redis.getDel(`user-sell:${user._id}`);
  }
);

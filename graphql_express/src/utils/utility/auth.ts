import { UserDocument } from "src/types";

export const sendTokenResponse = async (user: UserDocument): Promise<string> =>
  await user.getSignedJwtToken();

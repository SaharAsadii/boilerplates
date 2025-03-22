import { CustomerDocument, UserDocument } from "src/types";

export const sendTokenResponse = async (user: UserDocument): Promise<string> =>
  await user.getSignedJwtToken();

export const sendCustomerTokenResponse = async (
  customer: CustomerDocument
): Promise<string> => await customer.getSignedJwtToken();

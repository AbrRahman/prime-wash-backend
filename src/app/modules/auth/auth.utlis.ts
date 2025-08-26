import jwt from "jsonwebtoken";

export const createToken = async (
  payload: Record<string, unknown>,
  secret: string,
  expiresIn: any
) => {
  const token = await jwt.sign(payload, secret, { expiresIn: expiresIn });
  return token;
};

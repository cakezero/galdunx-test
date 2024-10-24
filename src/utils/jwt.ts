import jwt from "jsonwebtoken";
import ENV from "./env.js";

const JWT_SECRET = ENV.JWT_SECRET ? ENV.JWT_SECRET : "HELLO";

const JWT = {
  sign: async (payload: {}, options: { expiresIn?: string }) => {
    const { expiresIn } = options;

    const token = expiresIn
      ? jwt.sign(payload, JWT_SECRET, { expiresIn })
      : jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    return token;
  },

  verify: async (token: string) => {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  },
};

export default JWT;

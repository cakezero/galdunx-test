import type { NextFunction, Request, Response } from "express";
import JWT from "../utils/jwt";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized. Authorization header not set." });
    }

    const token = authHeader.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        error: "Unauthorized. Access token not set.",
      });
    }
    const decodedToken = await JWT.verify(token);
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.log(`Error in Authentication middleware ${err}`);
    if (err.name === "TokenExpiredError") {
      return res
        .status(400)
        .json({ message: "Token has expired" });
    }
    return res
      .status(500)
      .json({ message: "Invalid token" });
  }
};


export { requireAuth };

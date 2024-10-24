import * as express from "express";
import User from './models/user';

declare global {
  namespace Express {
    interface Request {
      user?: User; // You can replace 'any' with a more specific type if needed
    }
  }
}

import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../../../application/controllers/auth";
import AuthMiddleware from "../../../middleware/express/auth";

const router = Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.createUser(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.loginUser(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.patch(
  "/signout",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.signOutUser(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;

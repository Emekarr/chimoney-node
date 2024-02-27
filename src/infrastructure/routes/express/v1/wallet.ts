import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../../../../application/controllers/wallet";
import AuthMiddleware from "../../../middleware/express/auth";

const router = Router();

router.get(
  "/transactions",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.fetchTransactions(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/fetch",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.fetchWallet(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/pay/email",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.sendValueViaEmail(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/request/email",
  AuthMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.requestPaymentViaEmail(req.ctx);
    } catch (err: any) {
      next(err);
    }
  }
);
export default router;

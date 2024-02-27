import { Router } from "express";
import authRoutes from "./auth";
import walletRoutes from "./wallet";

const router = Router();

router.use("/auth", authRoutes);
router.use("/wallet", walletRoutes);

export default router;

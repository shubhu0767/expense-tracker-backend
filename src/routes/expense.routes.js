import { Router } from "express";
import { verifyJWT } from "../midlewares/auth.middleware.js";
import {
  deleteExpense,
  getExpenses,
  saveOrUpdateExpense,
} from "../controllers/expense.controller.js";
import { upload } from "../midlewares/multar.middleware.js";

const router = Router();

router
  .route("/saveOrUpdateExpense")
  .post(
    verifyJWT,
    upload.fields([{ name: "userPhoto", maxCount: 1 }]),
    saveOrUpdateExpense
  );
router.route("/getExpenses").get(verifyJWT, getExpenses);
router.route("/deleteExpense/:expenseId").delete(verifyJWT, deleteExpense);

export default router;

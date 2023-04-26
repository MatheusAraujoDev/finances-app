import express from 'express';
import { TransactionsController } from '../controllers/TransactionsController';

export const transactionsRoutes = express.Router();
const transactionsController = new TransactionsController();

transactionsRoutes.post("/", async (req, res) => {
  await transactionsController.createTransaction(req, res)
})

transactionsRoutes.get("/", async (req, res) => {
  await transactionsController.getTransactionsByUser(req, res)
})

transactionsRoutes.get("/:id", async (req, res) => {
  await transactionsController.getTransactionById(req, res)
})

transactionsRoutes.put("/:id", async (req, res) => {
  await transactionsController.updateTransaction(req, res)
})

transactionsRoutes.delete("/", async (req, res) => {
  await transactionsController.deleteTransactions(req, res)
})

import { Request, Response } from "express";
import { validateTransaction } from "../middlewares/transactionValidations";
import { CreateTransactionService } from "../services/CreateTransactionService";
import { DeleteTransactions } from "../services/DeleteTransactions";
import { GetTransactionById } from "../services/GetTransactionById";
import { GetTransactionsByUserId } from "../services/GetTransactionsByUserId";
import { UpdateTransaction } from "../services/UpdateTransaction";

const now = new Date()

export class TransactionsController {
  async createTransaction(req: Request, res: Response) {
    try {
      const { userId } = req;
      const { description, amount, category } = req.body;

      const validation = validateTransaction(description, amount, category, userId)
      if(validation.error) {
        return res.status(403).json(validation.error.message)
      }

      const createTransactionService = new CreateTransactionService();
      const transaction = await createTransactionService.execute({
        description,
        amount,
        category,
        date: now.toISOString(),
        userId,
      })

      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  async getTransactionsByUser(req: Request, res: Response) {
    try {
      const { userId } = req;
      const getTransactionsByUserId = new GetTransactionsByUserId();

      const transactions = await getTransactionsByUserId.execute({
        userId,
      });

      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(500).json({message: 'Server Error'})
    }
  }

  async getTransactionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getTransactionById = new GetTransactionById();

      const transaction = await getTransactionById.execute({
        id,
      });

      return res.status(200).json(transaction);

    } catch (error) {
      return res.status(500).json({message: 'Server Error'})
    }
  }

  async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, amount, category } = req.body;

      const validation = validateTransaction(description, amount, category, id)
      if(validation.error) {
        return res.status(403).json(validation.error.message)
      }

      const updateTransaction = new UpdateTransaction();

      await updateTransaction.execute({
        id, description, amount, category
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({message: 'Server Error'})
    }
  }

  async deleteTransactions(req: Request, res: Response) {
    const { ids } = req.body;

    const deleteTransactions = new DeleteTransactions();

    await deleteTransactions.execute({
      ids,
    });

    return res.status(204).send();
  }
}

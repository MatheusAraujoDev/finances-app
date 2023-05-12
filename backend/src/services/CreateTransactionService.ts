import { prisma } from "../prisma";

interface ICreateTransactionService {
  description: string
  amount: number
  category: string
  date: string
  userId: string
}

export class CreateTransactionService {
  async execute({ description, amount, category, date, userId }: ICreateTransactionService) {

    const transactionAlreadyExists = await prisma.transaction.findFirst({ where: { description, userId } });
    if(transactionAlreadyExists) {
      throw new Error('Transaction already exists!')
    }

    const transaction = await prisma.transaction.create({
      data: {
        description,
        amount,
        category,
        date,
        userId
      }
    })

    return transaction;
  }
}

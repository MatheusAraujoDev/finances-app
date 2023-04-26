import { prisma } from "../prisma";

interface IGetTransactionsByUserId {
  userId: string;
}

export class GetTransactionsByUserId {
  async execute({ userId }: IGetTransactionsByUserId) {

    const findTransactions = await prisma.transaction.findMany({
      where: {
        userId
      }
    })

    return findTransactions;
  }
}

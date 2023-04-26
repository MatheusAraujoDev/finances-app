import { prisma } from "../prisma";

export class DeleteTransactions {
  async execute({ ids }) {

    await prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids
        }
      },
    })

  }
}

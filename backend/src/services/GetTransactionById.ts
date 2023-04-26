import { prisma } from "../prisma";

interface IGetTransactionById {
  id: string;
}

export class GetTransactionById {
  async execute({ id }: IGetTransactionById) {

    const findTransaction = await prisma.transaction.findFirst({
      where: {
        id
      }
    })

    return findTransaction;
  }
}

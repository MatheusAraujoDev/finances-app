import { prisma } from "../prisma";

interface IUpdatePokemon {
  id: string;
  description: string
  amount: number
  category: string
}

export class UpdateTransaction {
  async execute({ id, description, amount, category }: IUpdatePokemon) {
    
    await prisma.transaction.update({
      where: {
        id
      },
      data: {
        description, amount, category
      }
    });

  }
}

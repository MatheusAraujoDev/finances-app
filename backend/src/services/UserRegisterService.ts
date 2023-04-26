import bcrypt from "bcrypt";
import { prisma } from "../prisma";

interface IUserRegisterService {
  name: string
  email: string
  password: string
}

export class UserRegisterService {
  async execute({ name, email, password }: IUserRegisterService) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const userAlreadyExists = await prisma.user.findFirst({ where: { email } });
    if(userAlreadyExists) {
      throw new Error('User already exists, try another e-mail!')
    }
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      }
    })

    return user;
  }
}

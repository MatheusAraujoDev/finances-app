import { Request, Response } from "express";
import { validateUser } from "../middlewares/userValidations";
import { GetUserByIdService } from "../services/GetUserByIdService";
import { UserLoginService } from "../services/UserLoginService";
import { UserRegisterService } from "../services/UserRegisterService";


export class UserController {
  async register(req:Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const validation = validateUser(name, email, password)
      if(validation.error) {
        return res.status(403).json(validation.error.message)
      }

      const userRegisterService = new UserRegisterService();
      await userRegisterService.execute({
        name,
        email,
        password
      });

      return res.status(201).send();
    } catch (error) {
      return res.status(500).json({message: 'Server Error!'})
    }
  }

  async login(req:Request, res: Response) {
    try {
      const {email, password} = req.body;
      const userLoginService = new UserLoginService();

      const login = await userLoginService.execute({
        email,
        password
      });

      return res.status(200).json(login);

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }

  async getUserById(req:Request, res: Response) {
    try {
      const { id } = req.params;

      const getUserByIdService = new GetUserByIdService();

      const user = await getUserByIdService.execute({
        id
      });

      return res.status(200).json(user);

    } catch (error) {
      return res.status(500).json({message: 'Server Error'})
    }
  }
}

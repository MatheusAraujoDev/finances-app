import cors from 'cors';
import "dotenv/config";
import express from 'express';
import { authMiddleware } from './middlewares/authMiddleware';
import { transactionsRoutes } from './routes/transactionRoutes';
import { userRoutes } from './routes/userRouter';
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/transactions", authMiddleware, transactionsRoutes);

const PORT = 3001;

app.listen(PORT, () => console.log(`API running on PORT: ${PORT} 🚀`));

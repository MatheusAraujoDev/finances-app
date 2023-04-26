import cors from 'cors';
import "dotenv/config";
import express from 'express';
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.listen(PORT, () => console.log(`API running on PORT: ${PORT} 🚀`));

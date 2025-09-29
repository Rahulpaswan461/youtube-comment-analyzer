import 'dotenv/config';
import express, { type Application, type Request ,type Response} from 'express';
import cors from 'cors';
import commentRoute from './routes/comments.js';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
})

app.use("/api/comments", commentRoute)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

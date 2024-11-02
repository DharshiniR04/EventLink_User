const express = require('express');
const dotenv = require('dotenv');
const cors=require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');
const eventRoutes=require('./routes/eventRoute');
const bookRoutes=require('./routes/bookRoutes');
const paymentRoutes=require('./routes/paymentRoutes');

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));

app.get("/",async(req,res)=>{
     res.json("WELCOME TO EVENTLINK");
})

app.use('/api/auth', authRoutes);
app.use('/api/user',userRoutes);
app.use('/api/event',eventRoutes);
app.use('/api/book',bookRoutes);
app.use('/api/payment',paymentRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

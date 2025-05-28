const express = require('express');
const dotenv = require('dotenv')
const connectDb = require("./db")
const app = express();


dotenv.config();
connectDb();
app.use(express.json());

app.listen(3000 , ()=>{
    console.log('Server is running on port 3000..');
})

app.use("/api" , require("./routes/userRoutes"));
app.use("/adminApi", require("./routes/adminRoutes"))
app.use("/event" , require("./routes/eventRoutes"))

app.get("/" , (req , res)=>{
    res.send("Hello World..");
})



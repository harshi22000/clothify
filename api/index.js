const express= require("express");
const mongoose= require("mongoose");
const dotenv= require("dotenv");
const userRouter= require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");
dotenv.config();
const app= express();
mongoose.set('strictQuery',true);


mongoose
.connect("mongodb+srv://harshita:ritik@cluster0.fxzqxqn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log("DB connection successful"))
.catch((err)=>{console.log(err)});

// app.get("/api/test", ()=>{
//     console.log("Test is successful");
// });

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend service is running");
})
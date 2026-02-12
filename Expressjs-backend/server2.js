// const fs = require("fs").promises;
const express = require("express");
const app = express();
const cors = require("cors");
const PORT= 5000;


// app.use(cors({
//     origin: "*"
// }))
app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/public/form.html");
    // res.send("hello")
})

app.post("/students/register",(req,res)=>{
    console.log("form data",req.body);
    res.send("register")
})

app.listen(PORT, () => {
  console.log("Server is listening on port:5000");
});
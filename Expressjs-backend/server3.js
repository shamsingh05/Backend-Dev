const express=require("express");
const app=express();
const fs=require("fs").promises;

app.set("view engine", "ejs");

app.use(express.urlencoded({extended: true}))
const readStudentsFromFile = async ()=>{
    const data = await fs.readFile("./students.json", "utf-8");
    return JSON.parse(data || "[]");
}

const writeStudentsFromFile = async (records) => {
    await fs.writeFile("./students.json", JSON.stringify(records,null,2));
}

app.get("/", async(req,res)=>{
    const fileData = await readStudentsFromFile();
    console.log(fileData);
    res.render("form", {allStudents: fileData});
})

const PORT= 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});
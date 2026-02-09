const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const PORT = 8000;


const filePath = path.join(__dirname, "students.json");

const readFromFile = () => {
    const data = fs.readFileSync(filePath, "utf-8");
    return data ? JSON.parse(data) : [];
};


const writeToFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

app.get("/", (req, res) => {
    res.send("Welcome to home page");
});

app.get("/users", (req, res) => {
    res.send("<h1>This is users page</h1>");
});


const students = [
    { id: 1, name: "Alice", branch: "CS" },
    { id: 2, name: "Abhi", branch: "ECE" },
    { id: 3, name: "Abhiyansh", branch: "Ec" },
    { id: 4, name: "Priyansh", branch: "Cyber" }
];


app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.send(`You are requesting for User Id: ${userId}`);
});


app.get("/students/search", (req, res) => {
    const branch = req.query.branch;

    if (!branch) {
        return res.json(students);
    }

    const foundStudents = students.filter(s => s.branch == branch);
    res.json(foundStudents);
});


app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    const arrayIndex = students.findIndex(s => s.id == id);
    if (arrayIndex < 0) {
        return res.status(404).send("Student not found");
    }

    res.json(students[arrayIndex]);
});


app.get("/students", (req, res) => {
    const id =req.params.id;

    const arrayIndex=students.findIndex(s=>s.id==id);
    if(arrayIndex<0){
        return res.status(404).send("Student not found");
    }

    const data =students[arrayIndex];
    return res.json(data);
    
});

app.post("/students/register", (req, res) => {
    const { id, name, branch } = req.body;

    if (!id || !name || !branch) {
        if (!id) return res.status(400).send("Please provide id");
        if (!name) return res.status(400).send("Please provide name");
        return res.status(400).send("Please provide branch");
    }
    const studentsFromFile = readFromFile();

    const existStudent = studentsFromFile.find(s => s.id == id);
    if (existStudent) {
        return res.status(409).send(`Student with ID ${id} already exists`);
    }

    const newStudent = { id, name, branch };
    studentsFromFile.push(newStudent);
    writeToFile(studentsFromFile);
    students.push(newStudent);
    res.status(201).json(newStudent);
});

app.post("/students/register",(req,res)=>{
    const{name,branch}=req.body;

    if (!name || !branch)return res.status(400).send("Details missing");

    // Read the first file
    fs.readFile("./students.json","utf-8",(err,data)=>{
        if(err) return res.status(500).send("Could not read file");

        // Parse existing data or start with empty array
        const students = JSON.parse(data || "[]");

        // Create and push new student 
        const newStudent={
            id: students.length>0?students[students.length-1].id + 1 : 1,
            name,
            branch,
        };
        students.push(newStudent);
    })
    // Write the whole array back to the file (Overwriting)
    fs.writeFile(
        "./students.json",
        JSON.stringifyy(students,null,2),
        (err)=>{
            if(err)return res.status(500).send("Error writing to file");
            
            //ONLY send response inside the success callback
            return res
                .status(201)
                .json({message:"Registered!", student:newStudent});
        }
    )
})

app.put("/students:id", (req,res)=>{
    const userId = parseInt(req.params.id);

    const foundIndex=students.findIndex(s => s.id==userId);
    if(foundIndex == -1){
        res.status(404).send("Student not found")
    }
    students[foundIndex]={...students[foundIndex],...req.body};

    const result={message:"Student record updated successfully",students:students}

    return res.status(200).json(result)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
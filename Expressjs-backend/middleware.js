const fs = require("fs").promises;
const express = require("express");
const app = express();

app.use(express.json())//in built middlewear

const PORT= 8000;
app.listen(PORT, () => {
  console.log("Server is listening on port:8000");
});

// app.use((req,res,next)=>{
//   console.log("I am middleware 1");
//   // return res.send("you are not allowed");
//   next();
// })

// app.use((req,res,next)=>{
//   console.log("I am middleware 2");
//   // return res.send("you are not allowed");
//   next();
// })
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  const VALID_TOKEN = "mysecrettoken123";

  if (token !== VALID_TOKEN) {
    return res.status(403).json({ message: "Invalid or unauthorized token" });
  }

  next();
};


const loggerFile = async (req, res, next) => {
  const log = `Request at: ${new Date().toLocaleString()} | Method: ${req.method}\n`;
  try {
    await fs.appendFile("log.txt", log);
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};


const readStudentsFromFile = async () => {
  try{
    const data = await fs.readFile("./students.json", "utf-8");
  }
  catch(error){
    return JSON.parse(data || "[]");
  }
};

app.get("/students",loggerFile,async(req,res)=>{
const students=await readStudentsFromFile();
return res.status(200).json(students);
})

const writeStudentsToFile = async (records) => {
  await fs.writeFile("./students.json", JSON.stringify(records, null, 2));
};

app.get("/students", async(req, res) => {
    const students= await readStudentsFromFile();
    return res.status(200).json(students);
})


app.put("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty body not allowed" });
    }

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    existingStudents[foundIndex] = {
      ...existingStudents[foundIndex],
      ...req.body,
    };

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Updated Successfully",
      student: existingStudents[foundIndex],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


app.delete("/students/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const existingStudents = await readStudentsFromFile();

    const foundIndex = existingStudents.findIndex((s) => s.id === userId);
    if (foundIndex === -1) {
      return res.status(404).send("Student not found");
    }

    const deletedStudent = existingStudents.splice(foundIndex, 1);

    await writeStudentsToFile(existingStudents);

    return res.status(200).json({
      message: "Student deleted successfully",
      deletedStudent: deletedStudent[0],
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.post("/students",authMiddleware, async (req, res) => {
  try {
    const { name, branch } = req.body;

    if (!name || !branch) {
      return res.status(400).json({ message: "Name and branch are required" });
    }

    const students = await readStudentsFromFile();

    const newStudent = {
      id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
      name,
      branch,
    };

    students.push(newStudent);
    await writeStudentsToFile(students);

    return res.status(201).json({
      message: "Student registered successfully",
      student: newStudent,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

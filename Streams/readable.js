const fs= require("fs");

const path=require("path");

const inputFilePath=path.join(__dirname, "input.txt");

const readStream =fs.createReadStream(inputFilePath, {encoding:"utf-8"});
// const 
readStream.on("data",(chunk)=>{
    console.log("Data is received in chunk:", chunk);
})

readStream.on("end",()=>{
    console.log("readstream is ended");
})

readStream.on("error",()=>{
    console.log("error occured",err.message);
})
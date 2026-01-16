const fs = require("fs")
fs.writeFileSync("./test.txt", "This is test file")

fs.write("./test.txt", "this is Async file content",(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("file is created")
    }

    fs.appendFileSync("test.txt", new Date().toLocaleString())
    const file=fs.readFileSync("test.txt","utf-8")
})
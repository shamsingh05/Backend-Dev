// const http=require("http");
// const server=http.createServer((req,res)=>{
//     res.writeHead(200,{"Content-Type":"text/html"});
//     console.log(req);
//     res.end("Server is running");
// })
// server.listen(8000,()=>{
//     console.log("server is running on port 8000");
// })
const url=require("url");

const http =require("http")
const server=http.createServer((req,res)=>{
    // res.writeHead(200,{"Content-Type":"text/html"});
    // console.log(req);
    // res.end("Server is running");
    
    const parsedUrl=url.parse(req.url);
    console.log(parsedUrl);
    const name=parsedUrl.query;
    // const method=req.method;
    switch(req.url){
        case "/":
            res.end('Welcome to home page')
            break;
        case "/about-us":
            // res.end("welcome to about-us page")
            res.writeHead(200,{"Content-Type":"text/html"});
            res.end(`<h1> Hello,I am ${name}</h1>`);
            res.end({
                name:Shambhavi
            });
            break;
        default:
            res.writeHead(404,{"Content-Type":"text/html"})    
            res.end("Page not found")

    }
})
server.listen(8000,()=>{
    console.log("server is running on port 8000");
})


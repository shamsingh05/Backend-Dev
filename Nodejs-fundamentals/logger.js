const fs=require("fs")

function logActivity(message){
const timestamp=new Date().toLocaleString();
const logmessage=`${message} -${timestamp}\n`;
fs.appendFileSync("activity.log",logmessage);
}

module.exports=logActivity;
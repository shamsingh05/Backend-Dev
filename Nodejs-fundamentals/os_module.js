require("./os_module");
const os=require("os");

const totalMemory=os.totalmem()/(1024*1024*1024);
const freeMemory=os.freemem()/(1024*1024*1024);

const platform=os.platform();
const uptime=os.uptime()/(3600);

const model=os.cpus()[0].model;

console.log(totalMemory,platform,uptime,model);
// Task 1 ->>The "Order Status"


function checkOrderStatus(orderId){
    return new Promise((resolve , reject) => {
        setTimeout(()=>{
            if(orderId === "number"){
                resolve("Order Shipped");
            }
            else{
                reject("Invalid Order Id");
            }
        },1000)

        
    })
} 

async function run(){
    try{
        const result = await checkOrderStatus(101);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}

run();




//Task 2 ->>The "Multi-Step" Authentication



function getUser(username){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({ name: "Ishita", type : "Premium"})
        },1500);
    });
}

function checkSubscription(user){
    return new Promise((resolve , reject) =>{
        if(user.type === "Premium"){
            resolve("Access Granted to Netflix");
        }
        else{
            reject("Please Subscribe");
        }
    });
}

async function customer(){
    try{
        const user = await getUser("Ishita");
        const result = await checkSubscription(user);
        console.log(result);
    }
    catch(err){
        console.log(err);
    }
}
customer();


//Task 3 =>> Smart-Shop Dashboard

function fetchUser(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve({ name: "Ishita", isPremium: true });
        },1000);
    })
}

function fetchOrder(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([{ item: "Laptop", price: 1000,status: "delivered" }, { item: "Phone", price: 500, status:"pending" }]);
        },1500);
    })
}

async function displayDashboard(id){
    try{
        const user = await fetchUser(id);
        const orders = await fetchOrder(id);

        const deliveredOrders = orders.filter(order => order.status === "delivered");

        const finalPrices = deliveredOrders.map(order => {
            if (user.isPremium) {
                return order.price * 0.9; // 10% discount
            }
            return order.price;
        });

        const total = finalPrices.reduce((sum, price) => sum + price, 0);

        console.log(`Hello ${user.name}`);
        console.log(`Total Amount: ${total}`);
    }
    catch(err){
        console.log(err);
    }
}
displayDashboard();
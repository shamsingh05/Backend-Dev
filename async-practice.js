// console.log("fetching user from database");

// let user;

// setTimeout(()=>{
//     user={name:"raj",email:"raj@gmail.com"}
//     console.log("user is fetched")
// },0);
// console.log(user);

// console.log("first task")
// Promise.resolve().then(()=> console.log("promise resolved"))
// console.log("second task")

// console.log("task1")
// setTimeout(()=>{
//     console.log("task2")
// },0)
// Promise.resolve().then(()=> console.log("task3"))
// console.log("task4")

const fetchUser=(id)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            const user={1:{name:"Raj",phone:"9567438349",address:"agra",},
        2:{name:"Shambhavi",phone:"3748998494",address:"phu quoc"}}
            const users=user[id];
            if(users){
                resolve(users)
            }
            else{
                reject("user not found")
            }
        },2000)
    })
}
fetchUser(1)
.then((users)=>console.log(users))
.catch((error)=>console.log(error))
// console.log(fetchUser(1))

// const getUserData= async()=>{
//     return new Promise((resolve,reject)=>{})
// }
// const getUserData=async()=>{
//     try{
//     const user=await fetchUser(1)
//     console.log(user)
//     }
//     catch(e){
//         console.log(e)
//     }
// }
// getUserData();

// const user={
//     username:"Shambhavi",password:"5198",mobile:"7453283729",fb:"https//:fb.com",city:"mathura"
// }

// const{username,city}=user
// console.log(username)

// const updateUser={...user,password:"1234"}
// console.log("upUser",updateUser)

// const{password,...publicdata}=updateUser

// console.log("publicdata",publicdata)

// numbers=[1,2,3,4,5]
// const a=numbers.map((number,index) => number*2)
// console.log("a",a)

const user1={name:"Shambhavi",email:"abc@gmail.com",address:"mathura",social:{fb:"https://fb.com",insta:"https://insta.com"}}
// const user2=user1
// user2.name="Vishal"
// console.log(user1.name)

const user2={...user1}
user2.social.fb="fb.com"
console.log(user1.social.fb)
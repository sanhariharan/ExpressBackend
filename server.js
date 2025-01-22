// const http=require('http'); // Import Node.js core module  http module we use require
// const calculate=require('./calculator');
// const server=http.createServer((req,res)=>{
//   res.writeHead(200,{"content-Type":"text/html"});

//   const html=`
//   <h1>Calculator</h1>
//   <p>addition: ${calculate.add(10,20)}</p>
//   <p>subtraction: ${calculate.sub(10,20)}</p>
//   <p>mutliplication: ${calculate.mul(10,20)}</p>
//   <p>division: ${calculate.div(10,20)}</p>
//   `
//   res.end(html);
// });
// server.listen(3000,()=>{
//   console.log("Server is running on http://127.0.0.1:3000/");
// });
//  const fs=require('fs'); // utf8 is a file encoding format //fs is a file system module under node.js
// fs.readFile('Sample.txt',"utf8",(err,data)=>{
//   if(err){
//     console.error(err);
//   }
//   console.log(data);
// })

// write a file
// fs.writeFile("sample1.txt","hello world","utf8",(err)=>{
//   if(err){
//     console.error(err);
//   }
// });



// reading and writing  a json file
// fs.readFile("sample.json","utf8",(err,data)=>{
//   if(err){
//     console.error(err);
//   }
//   const json=JSON.parse(data);
//   const newJson=[...json,newPerson]; //JSON.stringify() method converts a JavaScript object or value to a JSON string
//   fs.writeFile("sample.json",JSON.stringify(newJson),()=>{
//     if(err){
//       console.error(err);
//     }
//     console.log("new person added");
//   });
// });

//reading and delete a name from the json file using id
// 
//




//crud operations in student.json file
const fs = require('fs');

//reading and delete a name from the json file using id

//crud operations in student.json file
fs.readFile("student.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const json = JSON.parse(data); //create a function so we will pass the json data to get crud operated in student .json

  function update(id, newData) {
    const newJson = json.map((person) => {
      if (person.id === id) {
        return { ...person, ...newData };
      }
      return person;
    });

    fs.writeFile("student.json", JSON.stringify(newJson), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("update student data");
      }
    });
  }

  update(6, { name: "sohn", age: 30, city: "New York", amount: 1500 });
});













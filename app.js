const express=require('express')
const app=express();
const mongoose=require('mongoose');
app.use(express.json()); // express will parse the data from the request body 
const { v4 : uuidv4 } = require('uuid');


mongoose.connect("mongodb+srv://sanhariharan2023cse:123qwerty@cluster0.zkdc9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("Connected to database");
})
// we are setting a wrapper to the express app in which format the data should be stored
const expenseSchema=new mongoose.Schema({
  id:{type:String,required:true,unique:true},
  title:{type:String,required:true},
  amount:{type:String,required:true},
 
})
const Expense=mongoose.model("Expense",expenseSchema); // in this we will create a collection

app.get("/api/expenses",async(req,res)=>{
  const expenses = await Expense.find();
  if(!expenses){
    res.status(404).json({message:"Not found"});
  }
  res.status(200).json(expenses);
})


//get
app.get('/api/expenses/:id',async(req,res)=>{
try{
 const{id}=req.params;  
 const expense= await Expense.findOne({id});
 if(!expense){
  res.status(404).json({message:"Not found"});
  return;
 }        // can send data through query or params
  res.status(200).json(expense);
} catch(error){
  res.status(500).json({message:"Internal server error"});  
}

});                                                       // params is used to send data in the url
                                                         // middleware is a function that will be executed between the request and response
                                                        //ex: app.use(express.json()) is a middleware


 app.post('/api/expenses',async(req,res)=>{
  // console.log(req.body); 

try{
  const {title,amount}=req.body;
if(!title || !amount){
  res.status(400).json({message:"Title and amount are required"});
  return;
}
  const newExpense= new Expense({
    id:uuidv4(),
    title,
    amount
  })
                                                          // postman to send data we use post method we check in terminal
 const savedExpense=await newExpense.save()   // save is a method to save the data in the database  
  res.status(201).json(savedExpense); //201 new data is saved
} catch(error){
  res.status(500).json({message:"Internal server error"});
}
 })

//delete methos
 app.delete('/api/expenses/:id',async(req,res)=>{
  const{id}= req.params;
  try{
    const deleteExpense=  await Expense.findOneAndDelete({id});
    if(!deleteExpense){
      res.status(404).json({message:"Not found"});
      return;
    }
    res.status(200).json({message:"Deleted successfully"});
  }catch(error){
    res.status(500).json({message:"Internal server error"});
  }
 })
 app.put('/api/expenses', async (req, res) => {
  const { id, amount } = req.query;
  console.log(id, amount);
  try {
    const updateExpense = await Expense.findByIdAndUpdate(id, { amount }, { new: true });
    if (!updateExpense) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    console.log(updateExpense);
    res.status(200).json({ message: "Updated successfully", updateExpense });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(3000,()=>{
  console.log("Server is running")
});

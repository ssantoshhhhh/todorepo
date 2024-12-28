const express = require("express");
const mongoose = require("mongoose");
const TaskSchema = require("./model");
const cors = require('cors');

mongoose.connect("mongodb+srv://santoshkumar90101s:ssantoshhhhh@cluster0.e5jbq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("DB is Successfully Connected"))
  .catch(err => console.log("Database connection error:", err));

const app = express();


app.use(express.json());
app.use(cors({
  origin:'*'
}))

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Task API');
});

// Add task route
app.post('/addtask', async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new TaskSchema({
      todo: todo
    });
    await newData.save();
    const allTasks = await TaskSchema.find(); // Make sure to await the find() operation
    return res.json(allTasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Get tasks route
app.get('/gettasks', async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    return res.json(tasks); 
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
});


app.delete('/delete/:id',async(req,res)=>{
  try{
      await TaskSchema.findByIdAndDelete(req.params.id);
      return res.json(await TaskSchema.find())
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }

})



app.listen(5000, () => console.log("Server Running...Don't Worry"));

const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/TempDB", 
{useNewUrlParser: true})
.then(console.log("Connected to Mongodb"))
.catch((err)=>console.log(err));


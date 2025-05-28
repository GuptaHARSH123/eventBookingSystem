const mongoose = require('mongoose');
const connectDb =async()=>{
     try {
        await mongoose.connect("mongodb+srv://harsh9368gupta:ZZG6hqRaf2OOfSmJ@cluster0.jphhsbl.mongodb.net/")
        console.log("connected to database");
    }
    catch (err) {
          console.log('Error connecting to MongoDB', err);
          
    }
}

module.exports = connectDb;
const mongoose = require("mongoose")

// connect ke database
async function connectdb(){
  try {
    // connect ke mongodb pakai url string
    const conn = await mongoose.connect('mongodb://localhost:27017/buku-tamu',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
  
} 

module.exports = connectdb
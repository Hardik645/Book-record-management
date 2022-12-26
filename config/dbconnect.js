const mongoose=require("mongoose")

const DbConnection=async()=>{
    try{
    const DB_URI=process.env.MongoDb_URI;
    await mongoose.connect(DB_URI, {
        useUnifiedTopology :true,
        useNewUrlParser:true
    });
    } catch(err){
        console.error(err);
    }
}
module.exports=DbConnection;
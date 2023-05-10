var express = require('express');
const app=express();
const cors=require('cors')
const mongoose=require('mongoose')
const User=require('./model/user')
const questionDisplay=10;
const randm=()=>{
    let rand;
    const min = 0;
    const max = 9;
    rand = Math.round(Math.random() * (max - min) + min);
   
    return rand;
    //console.log(rand)
      
}

app.use(express.json());
app.use(cors())

mongoose.connect("mongodb://aaryashastri:aarya@ac-scr62fl-shard-00-00.yzapyki.mongodb.net:27017,ac-scr62fl-shard-00-01.yzapyki.mongodb.net:27017,ac-scr62fl-shard-00-02.yzapyki.mongodb.net:27017/DBchart?ssl=true&replicaSet=atlas-28xv0y-shard-0&authSource=admin&retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
});
app.get('/',async(req,res)=>{
    let resp = await User.find({});
    resp={data:resp}
    resp=resp.data
    let rand=randm()
    //
    
    //
    if(resp){
        res.send(resp[rand]);
    }
    else{
        console.log(error)
    }
})
app.listen(8000,()=>{
    console.log("server is runninng")
})

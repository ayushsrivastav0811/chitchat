const mongoose=require('mongoose');
const bcrypt =require('bcryptjs'); 
const userSchema=mongoose.Schema({
    name:{type:String ,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    pic:{
        type:String,
        default:"link deni hai"
    },
},
{
timestamp:true,
});
userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
// pre->before saveing  
userSchema.pre("save",async function (next){
    if(!this.isModified){
        next();
    }
//   generate the salt of 10 
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

const User=mongoose.model("User",userSchema);
module.exports=User;


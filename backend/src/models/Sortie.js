import mongoose from "mongoose"

const sortieSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  lieu:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  description:{
    type:String,
    required:false
  },
  participants:{
    type:[String],
    required:false
  },
  mapLink:{
    type:String,
    required:false
  },
  image:{
    type:String,
    required:false
  },
}, {timestamps:true})

const Sortie = mongoose.model("Sortie", sortieSchema);
export default Sortie;
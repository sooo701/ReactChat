import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const room = new Schema({
  roomNumber : Number,
  roomName : String,
  maxMember : Number,
  userList : {}
});



export default mongoose.model('room', room);

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const room = new Schema({
  roomNumber : Number,
  maxMember : Number,
  userList : {}
});



export default mongoose.model('room', room);

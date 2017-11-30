import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const user = new Schema({
  username : String,
  password : String
});

user.methods.generateHash = function(data) {
  return bcrypt.hashSync(data, 8);
};

user.methods.validateHash = function(password) {
  return bcrypt.compareSync(password, this.password);
}

export default mongoose.model('user', user);

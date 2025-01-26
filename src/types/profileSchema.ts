import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    applicationId:{
       type:String,
       required: true,
    },
    isUpdated:{
      type: Boolean,
      default: true,
    },
  name: {
    type: String,
    required: true, 
  },
  selectedPrompt: {
    type: String,
    required: true, 
  },
  answer: {
    type: String,
    required: true, 
  },
  imageurl1: {
    type: String,
    required: true, 
  },
  imageurl2: {
    type: String,
    required: true, 
  },
  age: {
    type: String, 
    required: true, 
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'nonbinary', 'preferNotToSay'],
    required: true, 
  },
  interestedGender: {
    type: String,
    enum: ['male', 'female', 'everyone'],
    required: true, 
  },
  bio: {
    type: String,
    required: false, 
  },
  profession: {
    type: String,
    required: false, 
  },
  smoking: {
    type: String,
    enum: ['nonSmoker', 'socialSmoker', 'regularSmoker'],
    default: 'nonSmoker',
    required: false, 
  },
  drinking: {
    type: String,
    enum: ['nonDrinker', 'socialDrinker', 'regularDrinker'],
    default: 'nonDrinker',
    required: false, 
  },
  interests: {
    movie: {
      type: Boolean,
      default: false,
    },
    music: {
      type: Boolean,
      default: false,
    },
    hiking: {
      type: Boolean,
      default: false,
    },
    reading: {
      type: Boolean,
      default: false,
    },
    fitness: {
      type: Boolean,
      default: false,
    },
  },
});

// // Create the model
// const User = mongoose.model('User', userSchema);

// module.exports = User;
const UserModel =
  (mongoose.models.User ) ||
  mongoose.model('User', UserSchema);

export default UserModel;
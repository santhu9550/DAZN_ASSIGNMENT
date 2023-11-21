import mongoose from 'mongoose';

// Create Schema
const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: { type: String, required: true },
  rating: { type: Number, required: true },
  link: { type: String, required: true },
  image: { type: String, required: true },
});

const Movies = mongoose.model('movies', schema);

export default Movies;

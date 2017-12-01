var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  Name: String,
  price: {type: Number, default: 0},
  upvotes: {type: Number, default: 0},
  imgURL: String,
});

CandidateSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};


mongoose.model('Candidate', CandidateSchema);


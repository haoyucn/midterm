var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Candidate = mongoose.model('Candidate');

router.get('/candidates', function(req, res, next) {
  Candidate.find(function(err, candidates){
    if(err){ return next(err); }
    res.json(candidates);
  });
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/candidates', function(req, res, next) {
  var candidate = new Candidate(req.body);
  console.log(candidate);
  candidate.save(function(err, candidate){
    if(err){ return next(err); }
    console.log("ready to send back from post ");
    res.json(candidate);
  });
  console.log("before exit post route");
});



router.param('candidate', function(req, res, next, id) {
  var query = Candidate.findById(id);
  query.exec(function (err, candidate){
    if (err) { return next(err); }
    if (!candidate) { return next(new Error("can't find candidate")); }
    req.candidate = candidate;
    return next();
  });
});

router.get('/candidates/:candidate', function(req, res) {
  res.json(req.candidate);
});

router.delete('/candidates/:candidate', function(req, res) {
  console.log("in Delete");
  req.candidate.remove();
  res.sendStatus(200);
});


router.put('/candidates/:candidate/upvote', function(req, res) {
  console.log("in put route for upvote");
  req.candidate.upvote(function(err, candidate){
    console.log("in upvote itself");
    res.json(candidate);
  });
});

module.exports = router;

const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  questions: [{
    question: String,
    options: [String],
    correctOption: String,
    domain: String,
    subdomain: String,
    topic: String,
    subtopic: String
  }]
});

const ExamModel = mongoose.model('Exam', ExamSchema);

module.exports = ExamModel;

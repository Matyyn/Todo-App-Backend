const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExamsModel = require('./models/Exams');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Exams');

app.get('/', async (req, res) => {
    try {
        const exams = await ExamsModel.find();
        res.json(exams);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/:id', getExam, (req, res) => {
    res.json(res.exam);
});

app.post('/', async (req, res) => {
    const exam = new ExamsModel({
        title: req.body.title,
        thumbnail: req.body.thumbnail,
        examDate: req.body.examDate,
        questions: req.body.questions
    });

    try {
        const newExam = await exam.save();
        res.status(201).json(newExam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.patch('/:id', getExam, async (req, res) => {
    if (req.body.title != null) {
        res.exam.title = req.body.title;
    }
    if (req.body.thumbnail != null) {
        res.exam.thumbnail = req.body.thumbnail;
    }
    if (req.body.examDate != null) {
        res.exam.examDate = req.body.examDate;
    }
    if (req.body.questions != null) {
        res.exam.questions = req.body.questions;
    }
    try {
        const updatedExam = await res.exam.save();
        res.status(200).json(updatedExam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


app.delete('/:id', async (req, res) => {
    try {
        const result = await ExamsModel.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getExam(req, res, next) {
    let exam;
    try {
        exam = await ExamsModel.findById(req.params.id);
        if (exam == null) {
            return res.status(404).json({ message: 'Cannot find exam' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.exam = exam;
    next();
}

app.listen(3002, () => {
    console.log("server is running " );
});

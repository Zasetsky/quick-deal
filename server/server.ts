import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { Document, Schema } from 'mongoose';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin:HSUzMjOrZQMXh7lh@cluster0.jyzcmfa.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

interface ITask extends Document {
  name: string;
  completed: boolean;
}

const taskSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Task name cannot be empty' });
  }

  try {
    const newTask = new Task({
      name: req.body.name,
      completed: req.body.completed
    });
    const savedTask = await newTask.save();
    res.send(savedTask);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
  if (!req.body.name) {
    return res.status(400).send({ message: 'Task name cannot be empty' });
  }

  try {
    const updatedTask = await Task.updateOne({ _id: req.params.id }, { name: req.body.name, completed: req.body.completed });
    res.send(updatedTask);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.deleteOne({ _id: req.params.id });
    res.send(deletedTask);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

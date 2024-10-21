import { Request, Response } from 'express';
import Problem from '../models/problem.model';
import { IProblemData } from '../interfaces/problem.interface';

export const addProblem = async (req: Request, res: Response) => {
  try {
    const problemData: IProblemData = req.body;
    const newProblem = new Problem(problemData);
    await newProblem.save();
    return res.status(201).json(newProblem);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding problem', error });
  }
};

export const getProblems = async (req: Request, res: Response) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json(problems);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching problems', error });
  }
};

export const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findOne({ id: parseInt(id) });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    return res.status(200).json(problem);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching problem', error });
  }
};

export const deleteProblem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProblem = await Problem.findOneAndDelete({
      id: parseInt(id),
    });
    if (!deletedProblem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    return res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting problem', error });
  }
};

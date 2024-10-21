import { Request, Response } from 'express';
import { Admin } from '../models/user.model';
import { Problem } from '../models/problem.model';
import { IProblemData } from '../interfaces/problem.interface';

const addProblem = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminId = req.cookies.id;
    if (!adminId) {
      res.status(401).json({ message: 'Admin Login Required!', success: false });
      return;
    }
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(401).json({ message: 'Admin Login Required!', success: false });
      return;
    }
    const problemData: IProblemData = req.body;

    const existingProblem = await Problem.findOne({ title: problemData.title });
    if (existingProblem) {
      res.status(400).json({ message: 'Problem Already Exists!', success: false });
      return;
    }

    const newProblem = new Problem(problemData);
    await newProblem.save();
    res.status(201).json({ message: 'Problem Added Successfully', success: true, problem: newProblem });
  } catch (error) {
    res.status(500).json({ message: 'Error Adding Problem', success: false, error });
  }
};

const getProblems = async (_: Request, res: Response) => {
  try {
    const problems = await Problem.find().limit(10);
    res.status(200).json({ message: 'Problems Fetched Successfully', success: true, problems: problems });
  } catch (error) {
    res.status(500).json({ message: 'Error Fetching Problems', success: false, error });
  }
};

const getProblemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findOne({ title: id });
    if (!problem) {
      res.status(404).json({ message: 'Problem Not Found', success: false });
      return; 
    }
    res.status(200).json(problem);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error Fetching Problem', success: false, error });
  }
};

const deleteProblem = async (req: Request, res: Response) => {
  try {
    const adminId = req.cookies.id;
    if (!adminId) {
      res
        .status(401)
        .json({ message: 'Admin Login Required!', success: false });
      return;
    }
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res
        .status(401)
        .json({ message: 'Admin Login Required!', success: false });
      return;
    }

    const { id } = req.params;
    const deletedProblem = await Problem.findOneAndDelete({
      title: id,
    });
    if (!deletedProblem) {
      res.status(404).json({ message: 'Problem Not Found', success: false });
      return;
    }
    res
      .status(200)
      .json({ message: 'Problem Deleted Successfully!', success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting problem', success: false, error });
  }
};

export default {
  getProblems,
  getProblemById,
  addProblem,
  deleteProblem,
}

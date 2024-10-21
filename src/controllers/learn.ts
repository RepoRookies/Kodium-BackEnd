import { Request, Response } from 'express';
import Learn from '../models/Learn';
import { ILearnData } from '../interfaces/Learn';

// Controller to add a learning resource
export const addLearn = async (req: Request, res: Response) => {
  try {
    const learnData: ILearnData = req.body;
    const newLearn = new Learn(learnData);
    await newLearn.save();
    return res.status(201).json(newLearn);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error adding learning resource', error });
  }
};

// Controller to fetch all learning resources
export const getLearns = async (req: Request, res: Response) => {
  try {
    const learns = await Learn.find();
    return res.status(200).json(learns);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching learning resources', error });
  }
};

// Controller to fetch a learning resource by problemId
export const getLearnByProblemId = async (req: Request, res: Response) => {
  try {
    const { problemId } = req.params;
    const learn = await Learn.findOne({ problemId });
    if (!learn) {
      return res.status(404).json({ message: 'Learning resource not found' });
    }
    return res.status(200).json(learn);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching learning resource', error });
  }
};

// Controller to delete a learning resource by problemId
export const deleteLearn = async (req: Request, res: Response) => {
  try {
    const { problemId } = req.params;
    const deletedLearn = await Learn.findOneAndDelete({ problemId });
    if (!deletedLearn) {
      return res.status(404).json({ message: 'Learning resource not found' });
    }
    return res
      .status(200)
      .json({ message: 'Learning resource deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error deleting learning resource', error });
  }
};

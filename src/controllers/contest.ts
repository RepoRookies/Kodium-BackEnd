import { Request, Response } from 'express';
import Contest from '../models/Contest'; 
import { IContestData } from '../interfaces/Contest';

// Controller to add a contest
export const addContest = async (req: Request, res: Response) => {
  try {
    const contestData: IContestData = req.body;
    const newContest = new Contest(contestData);
    await newContest.save();
    return res.status(201).json(newContest);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding contest', error });
  }
};

// Controller to fetch all contests
export const getContests = async (req: Request, res: Response) => {
  try {
    const contests = await Contest.find().populate('users').populate('problems');
    return res.status(200).json(contests);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching contests', error });
  }
};

// Controller to fetch a specific contest by ID
export const getContestById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contest = await Contest.findById(id).populate('users').populate('problems');
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    return res.status(200).json(contest);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching contest', error });
  }
};

// Controller to delete a contest by ID
export const deleteContest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedContest = await Contest.findByIdAndDelete(id);
    if (!deletedContest) {
      return res.status(404).json({ message: 'Contest not found' });
    }
    return res.status(200).json({ message: 'Contest deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting contest', error });
  }
};
import db from '../../config/database';
import { fetchAllUserQuery, fetchUserByEmailQuery } from './userQueries';
import { success, error } from '../../lib/log';

export const fetchAllUserController = async (req, res) => {
  try {
    const data = await fetchAllUserQuery();
    success('fetchAllUserController - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAllUserController - error= ', error);
    throw new Error(err);
  }
};

export const fetchAUserByEmailController = async (req, res) => {
  try {
    console.log('this is req.query', req.query);
    const data = await fetchUserByEmailQuery(req.query.email);
    console.log('data is ', data);
    success('fetchAUserByEmailController - successfully fetched data ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('fetchAUserByEmailController - error= ', error);
    throw new Error(err);
  }
};

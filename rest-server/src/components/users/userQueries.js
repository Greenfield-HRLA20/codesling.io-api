import db from '../../config/database';
import {
  fetchAllUserHelper,
  fetchUserHelper,
  fetchAUserByEmailHelper
} from './userSQLHelpers';
import { success, error } from '../../lib/log';


export const fetchAllUserQuery = async () => {
  try {
    const queryString = fetchAllUserHelper();
    const data = await db.queryAsync(queryString);
    success("fetchAllUserQuery - successfully fetched all users ", data);
    return data;
  } catch (err) {
    error("fetchAllUserQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchUserQuery = async payload => {
  try {
    const queryString = fetchUserHelper(payload);
    const data = await db.queryAsync(queryString);
    success("fetchUserQuery - successfully fetched all users ", data);
    return data;
  } catch (err) {
    error("fetchUserQuery - error= ", err);
  }
};

export const fetchUserByEmailQuery = async payload => {
  try {
    const queryString = fetchAUserByEmailHelper(payload);
    const { rows } = await db.queryAsync(queryString);
    success('fetchUserByEmailQuery - successfully fetched all users ', rows);
    const { id } = rows[0];
    return { id };
  } catch (err) {
    error('fetchUserByEmailQuery - error= ', err);
  }
};

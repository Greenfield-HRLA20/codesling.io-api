<<<<<<< HEAD
import db from '../../config/database';
import { addTestCaseHelper } from './testCasesSQLHelpers';
import { success, error } from '../../lib/log';
=======
import db from "../../config/database";
import { addTestCaseHelper } from "./testCasesSQLHelpers";
import { success, error } from "../../lib/log";
>>>>>>> Master rebase

export const addTestCaseQuery = async body => {
  try {
    const queryString = addTestCaseHelper(body);
    const data = await db.queryAsync(queryString);
<<<<<<< HEAD
    success('addTestCaseQuery - successfully added test case ', data);
=======
    success("addTestCaseQuery - successfully added test case ", data);
>>>>>>> Master rebase
    return data;
  } catch (err) {
    error("addTestCaseQuery - error= ", err);
  }
};

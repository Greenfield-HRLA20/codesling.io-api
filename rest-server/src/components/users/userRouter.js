import express from "express";

import {
  fetchAllUserController,
  fetchAUserByEmailController
} from "./userControllers";

const router = express.Router();

router.route("/fetchAllUsers").get(fetchAllUserController);

router.route("/fetchUserByEmail").get(fetchAUserByEmailController);

export default router;

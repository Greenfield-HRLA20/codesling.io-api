export const addUserChallengeHelper = ({ user_id, challenge_id, type }) => {
  return `
    INSERT INTO usersChallenges (user_id, challenge_id, type)
    VALUES (${user_id}, ${challenge_id}, ${type})
  `;
};

export const fetchAllUserChallengesHelper = ({ user_id }) => {
  return `
<<<<<<< HEAD
    SELECT c.id, c.title, c.content, c.difficulty, c.rating, tc.content AS test
=======
    SELECT c.id, c.title, c.content, c.difficulty, c.rating, tc.content as test
>>>>>>> commit for rebase
    FROM challenges AS c
      INNER JOIN usersChallenges AS uc
      ON (c.id=uc.challenge_id)
      INNER JOIN testCases AS tc
      ON (uc.challenge_id = tc.challenge_id) 
      WHERE (uc.user_id=${user_id})
  `;
};

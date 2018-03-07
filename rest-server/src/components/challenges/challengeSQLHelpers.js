export const addChallengeHelper = ({ title, content, difficulty }) => {
  return `
    INSERT INTO challenges (title, content, difficulty, rating)
    VALUES ('${title}', '${content}', ${difficulty}, 0)
    RETURNING id, title, content, difficulty
  `;
};

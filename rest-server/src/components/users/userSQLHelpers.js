export const fetchAllUserHelper = () => {
  return `
    SELECT id, email, username, password, clout, kdr
    FROM users
  `;
};

export const fetchUserHelper = user_id => {
  return `
    SELECT id, email, username, password, clout, kdr
    FROM users
    WHERE id=${user_id}
  `;
};

<<<<<<< HEAD
export const fetchAUserByEmailHelper = emailString => {
  return `
  SELECT id, email, username, password, clout, kdr
    FROM users
    WHERE email='${emailString}'
=======
export const fetchAUserByEmailHelper = email => {
  return `
  SELECT id, email, username, password, clout, kdr
    FROM users
    WHERE email=${email}
>>>>>>> commit for rebase
    `;
};

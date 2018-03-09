export const fetchAllMessagesForUserHelper = ({ sender_id }) => {
  return `
    SELECT id, sender_id, receiver_id, content
    FROM messages
    WHERE sender_id=${sender_id}
  `;
};

export const saveMessageHelper = ({ sender_id, receiver_id, content }) => {
  console.log("here");
  return `
    INSERT INTO messages (sender_id, receiver_id, content)
    values (${sender_id}, ${receiver_id},'${content}')
    RETURNING sender_id, receiver_id, content
  `;
};

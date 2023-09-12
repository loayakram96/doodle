const db = require("./dbconfig");

exports.getAllMessages = (room, callback) => {
  db.searchByValue(
    {
      table: "messages",
      searchAttribute: "room",
      searchValue: room,
      attributes: ['*']
    },
    (err, messages) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        console.log("messages", messages);
        callback(null, messages);
      }
    }
  );
};
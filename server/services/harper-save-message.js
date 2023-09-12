const db = require("./dbconfig");

exports.addMessage = (username, message, room) => {
  db.insert(
    {
      table: "messages",
      records: [
        {
          username: username,
          message: message,
          room: room,
        },
      ],
    },
    (err, res) => {
      if (err) console.log(err);

      console.log("response", res);
    }
  );
};

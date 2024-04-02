const fs = require('node:fs');
const path = require('path');

const ConversationToFile = (update) => {
  let messageIds;
  const dir = path.join(__dirname, '../logs/logs_messages/', `${update.user}`);

  try {
    const data = fs.readFileSync(path.join(__dirname, '../logs/logs_messages/messageIDs.json'));
    messageIds = new Set(JSON.parse(data));
  } catch (err) {
    messageIds = new Set();
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, `${update.conversationId}.json`);
  if (!messageIds.has(update.messageId) && !update.unfinished && update.finish_reason != 'stop') {
    fs.appendFile(filePath, `${JSON.stringify(update)}\n`, (err) => {
      if (err) {
        throw err;
      }
      messageIds.add(update.messageId);
    });
  }
};

module.exports = ConversationToFile;

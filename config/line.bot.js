const line = require("@line/bot-sdk");

const config = {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};
const client = new line.Client(config);
const middlewareLine = line.middleware(config)

module.exports = {
    client,
    middlewareLine
}
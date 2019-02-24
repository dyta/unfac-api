const db = require("../../config/mysql.connect");

const Invite = {
    GetEnterpriseSetting: function (id, callback) {
        return db.query(
            "SELECT * FROM `EnterpriseSetting` WHERE `entId` = ?;",
            [id],
            callback
        );
    },
    GetLiffHomeForNotification: function (id, callback) {
        return db.query(
            "SELECT `liff_full_home`, `liff_tall_home`, `liff_compact_home` FROM `EnterpriseSetting` WHERE `entId` = ?;",
            [id],
            callback
        );
    },

    CreateEnterpriseSetting: function (id, data, callback) {
        return db.query(
            "INSERT INTO `EnterpriseSetting`(`entId`, `API_KEY`, `liff_full_account`, `liff_tall_account`, `liff_compact_account`, " +
            "`liff_full_history`, `liff_tall_history`, `liff_compact_history`, `liff_full_home`, `liff_tall_home`, `liff_compact_home`, `liff_full_wallet`, `liff_tall_wallet`, `liff_compact_wallet`) " +
            "VALUES (?, ?, ?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?);",
            [id, data.api, data.liff_full_account, data.liff_tall_account, data.liff_compact_account, data.liff_full_history, data.liff_tall_history, data.liff_compact_history,
                data.liff_full_home, data.liff_tall_home, data.liff_compact_home, data.liff_full_wallet, data.liff_tall_wallet, data.liff_compact_wallet
            ],
            callback
        );
    },
};
module.exports = Invite;
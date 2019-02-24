const db = require("../../config/mysql.connect");

const Invite = {
    GetExistsAccountInInvite: function (inv, callback) {
        return db.query(
            "SELECT `entName`, COUNT(`userId`) AS `exists` FROM `Invite` WHERE `userId` = ? AND `code` = ?;",
            [inv.id, inv.code],
            callback
        );
    },
    GetAllInviteByEnterpriseId: function (id, callback) {
        return db.query(
            "SELECT * FROM `Invite` T1 LEFT JOIN `Account` T2 ON T1.`userId` = T2.`userId` WHERE T1.`entId` = ?;",
            [id],
            callback
        );
    },
    CancelInviteByOwnerEnterprise: function (data, callback) {
        return db.query(
            "DELETE FROM `Invite` WHERE `invId`= ? AND `entId` =?;",
            [data.invId, data.entId],
            callback
        );
    },
    CreateRequestInInvite: function (inv, callback) {
        return db.query(
            "INSERT INTO `Invite`(`entId`, `userId`, `entName`, `code`, `invCreateAt`) VALUES (?, ?, ?, ?, now());",
            [inv.entId, inv.userId, inv.entName, inv.code],
            callback
        );
    },
};
module.exports = Invite;
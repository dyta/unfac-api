const db = require("../../config/mysql.connect");

const Account = {
    GetExistsAccount: function (id, callback) {
        return db.query(
            "SELECT COUNT(`lineId`) AS `exists` FROM `Account` WHERE `lineId` = ?;",
            [id],
            callback
        );
    },

    GetCurrentAccount: function (userId, callback) {
        return db.query(
            "SELECT T1.`userDisplayName`,T1.`userFullname`,T1.`userPhoneNumber`,T1.`userEmail`,T1.`userId`,T1.`lineId`,T1.`userPictureUrl`,T1.`userRole`,T1.`userStatus`, T2.`entId` FROM `Account` T1 LEFT JOIN `Enterprise` T2 ON T1.`entId` = T2.`entId` WHERE T1.`lineId` = ?;",
            [userId],
            callback
        );
    },

    GetPackage: function (id, callback) {
        return db.query(
            "SELECT `entPackage` FROM `Enterprise` WHERE `entId` = ?;",
            [id],
            callback
        );
    },

    CreateAccount: function (user, callback) {
        return db.query(
            "Insert into `Account`(`lineId`, `userDisplayName`, `userFullname`, `userPictureUrl`, `userEmail`, `userPhoneNumber`, `userCreateAt`, `userUpdateAt`) values(?,?,?,?,?,?,now(),now());",
            [user.uid, user.name, user.fullname, user.picture, user.email, user.phoneNumber],
            callback
        );
    },
    UpdateUserProfile: function (user, callback) {
        return db.query(
            "UPDATE `Account` SET `userDisplayName` = ?, `userPictureUrl` = ? WHERE `lineId` = ?;",
            [user.name, user.picture, user.uid],
            callback
        );
    },
    UpdateEnterpriseWhenCreate: function (user, entId, callback) {
        return db.query(
            "UPDATE `Account` SET `entId` = ?, `userRole` = 2 WHERE `lineId` = ?;",
            [entId, user],
            callback
        );
    },

    UpdateRoleWhenRequestCollaborator: function (user, callback) {
        return db.query(
            "UPDATE `Account` SET `userRole` = 1 WHERE `userId` = ?;",
            [user.userId],
            callback
        );
    },



};
module.exports = Account;
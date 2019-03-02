const db = require("../../config/mysql.connect");

const Customer = {
    GetExistsCustomer: function (data, callback) {
        return db.query(
            "SELECT COUNT(`customerTel`) AS `exists`, `customerId`, `customerName` FROM `Customer` WHERE `customerTel` = ?;",
            [data.customerTel],
            callback
        );
    },
    Add: function (data, callback) {
        return db.query(
            "INSERT INTO `Customer`(`customerName`, `customerTel`, `customerAddress`, `cusDistrict`, `cusAmphoe`, `cusProvince`, `cusZipcode`) VALUES (?, ?, ?, ?, ?, ?, ?);",
            [data.customerName, data.customerTel, data.customerAddress, data.cusDistrict, data.cusAmphoe, data.cusProvince, data.cusZipcode],
            callback
        );
    },
};
module.exports = Customer;
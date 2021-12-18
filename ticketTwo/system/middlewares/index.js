const verifyToken = require('./verifyToken');
const verifyOTP = require('./verifyOTP');
const checkLogin = require('./checkLogin');
const checkPrivileges = require('./checkPrivileges');

module.exports = {
    verifyToken: verifyToken,
    verifyOTP: verifyOTP,
    checkLogin: checkLogin,
    checkPrivileges: checkPrivileges
}
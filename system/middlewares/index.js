const verifyToken = require('./verifyToken');
const checkLogin = require('./checkLogin');
const checkPrivileges = require('./checkPrivileges');

module.exports = {
    verifyToken: verifyToken,
    checkLogin: checkLogin,
    checkPrivileges: checkPrivileges
}
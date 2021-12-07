const router = require('express').Router();

const verifyToken = require('../system/middlewares').verifyToken;
const checkPrivileges = require('../system/middlewares').checkPrivileges;

const Controllers = require('../system/controllers')

const authController = new Controllers.AuthController();
const userController = new Controllers.UserController();


// ! NOTA ! le rotte con verifyToken vanno fatte da un utente loggato (ovvero con il jwt nell'header)


// (POST) login
router.post('/login', async (req, res) => {
    
    var result = await authController.login(req.body);
    res.status(result[0]).header('auth-token', result[1]).json( { "user": result[2] } );

});


// (POST) registrazione
router.post('/register', async (req, res) => {
    
    var result = await authController.register(req.body);
    res.status(result[0]).send(result[1]);
    
});


// (POST) mfa
router.post('/mfa', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Staff biglietteria"], next), async (req, res) => {

    var result = await authController.getTokenOTP(req.user.userID,req.body.OTP);
    res.status(result[0]).header('OTP-token',result[1]).send("Access allowed");

});


// (POST) recupera password
router.post('/recupera-password', async (req, res) => {
    
    var result = await userController.recuperaPassword(req.body.Mail);
    res.status(result[0]).send(result[1]);

});

// (POST) modifica password
router.post('/modifica-password', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next), async (req, res) => {
    
    var result = await userController.modificaPassword(req.user.userID,req.body);
    res.status(result[0]).send(result[1]);

});


// (PATCH) aggiorna i dati dell'area riservata dell'utente
router.patch('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next), async (req, res) => {

    var result = await userController.updateUserData(req.user.userID, req.body);
    res.status(result[0]).send(result[1]);

});


// (PATCH) aggiorna i privilegi dell'utente
router.patch('/privileges', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

    var result = await userController.updatePrivileges(req.body);
    res.status(result[0]).send(result[1]);

});


module.exports = router;
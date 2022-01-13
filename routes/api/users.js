const router = require('express').Router();

const TicketTwo = require(process.env.TICKET_TWO)

const verifyToken = TicketTwo.System.Middlewares.verifyToken;
const checkPrivileges = TicketTwo.System.Middlewares.checkPrivileges;

const authController = new TicketTwo.System.Controllers.AuthController();
const userController = new TicketTwo.System.Controllers.UserController();


// ! NOTA ! le rotte con verifyToken vanno fatte da un utente loggato (ovvero con il jwt nell'header)


// (POST) login
router.post('/login', async (req, res) => {
    
    authController.login(req.body).then(result => res.status(result[0]).header('auth-token', result[2]).send(result[1]))
});


// (POST) registrazione
router.post('/register', async (req, res) => {
    
    authController.register(req.body).then(result => res.status(result[0]).send(result[1]))
});


// (POST) mfa
router.post('/mfa', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Staff biglietteria"], next), async (req, res) => {

    authController.getTokenOTP(req.headers.user.userID,req.body.OTP).then(result => res.status(result[0]).header('OTP-token',result[2]).send(result[1]))
});


// (POST) recupera password
router.post('/recupera-password', async (req, res) => {
    
    userController.recuperaPassword(req.body.Mail).then(result => res.status(result[0]).send(result[1]))
});

// (POST) modifica password
router.patch('/modifica-password', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next), async (req, res) => {
    
    userController.modificaPassword(req.headers.user.userID,req.body).then(result => res.status(result[0]).send(result[1]))
});


// (PATCH) aggiorna i dati dell'area riservata dell'utente
router.patch('/', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Cliente","Organizzatore eventi","Staff biglietteria","Annullatore"], next), async (req, res) => {

    userController.updateUserData(req.headers.user.userID, req.body).then(result => res.status(result[0]).send(result[1]))
});


// (PATCH) aggiorna i privilegi dell'utente
router.patch('/privileges', verifyToken, (req, res, next) => checkPrivileges(req, res, ["Staff biglietteria"], next), async (req, res) => {

    userController.updatePrivileges(req.body).then(result => res.status(result[0]).send(result[1]))
});


module.exports = router;
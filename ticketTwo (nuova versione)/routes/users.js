const router = require('express').Router();

const verifyToken = require('../middlewares/verifyToken');

const checkPrivileges = require('../middlewares/checkPrivileges');

const AuthController = require('../controllers/AuthController');
const authController = new AuthController();





// ! NOTA ! le rotte con verifyToken vanno fatte da un utente loggato (ovvero con il jwt nell'header)


// (GET) ottieni profilo utente specifico (volendo l'utente corrente)
router.get('/:userID', async (req, res) => {

    var result = await userController.getUser(req.params.userID); // req.params.userID sarebbe -> .../api/users/5 -> ottiene l'utente 5
    res.status(result[0]).json(result[1]);

});

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


module.exports = router;
const { Router } = require('express')
const router = Router()

// Controllers
const { signup, signin } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router
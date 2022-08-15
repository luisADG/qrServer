const {Router} = require('express');
const router = Router();

router.get('/api/prueba', (req, res) => {
    res.send("hola");
});

module.exports = router;
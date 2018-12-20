const express = require('express');

const router = express.Router();

//receptions index page
router.get('/', (req, res)=> {
    res.render('receptions/index', {

    });
});

module.exports = router;
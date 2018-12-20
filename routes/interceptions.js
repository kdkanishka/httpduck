const express = require('express');

const router = express.Router();

//receptions index page
router.get('/', (req, res)=> {
    res.render('interceptions/index', {

    });
});

module.exports = router;
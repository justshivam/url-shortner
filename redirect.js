const express = require('express');
const db = require('./db');
const home = require('./routes/home');

const router = express.Router();

router.route('/').get(home);
router.route('/:id').get(async (req, res) => {
    if (req.params.id) {
        console.log('id:::::', req.params.id);
        const result = await db.query(`SELECT link from refs where sl = '${req.params.id}'`);
        if (result.rowCount !== 0) {
            const link = result.rows[0].link;
            console.log(link);
            res.redirect(link)
        }
        else {
            res.status(400).json({
                "message": "Bad Request"
            });
        }
    }
    else {
        res.status(500).json({
            "message": "Internal Server Error"
        })
    }
})

module.exports.redirects = router;
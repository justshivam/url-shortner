const URL = require("url").URL;
const db = require('../db');

module.exports = async (req, res) => {

    const DEFAULT_SL_LENGTH = 5;

    const link = req.body.link;
    if (!isValidUrl(link)) {
        res.status(405).json({
            "message": "Invalid URL. Make sure url starts from https://....."
        });
        return
    }
    const lqr = (await db.query(`SELECT * FROM refs WHERE link = '${link}';`));
    const linkGranted = (lqr.rowCount === 0);
    if (!linkGranted) {
        res.status(405).json({ "message": `Link Already Exists at https://${process.env.URL}/${lqr.rows[0].sl}` });
    }
    else {
        var sl = undefined;
        while (true) {
            sl = makesl(DEFAULT_SL_LENGTH);
            if ((await db.query(`SELECT sl FROM refs WHERE sl = '${sl}';`)).rows.length === 0) break;
        };
        await db.query(`INSERT INTO refs VALUES ('${link}','${sl}')`);
        res.status(200).json({ "message": `Link is created at https://${process.env.URL}/${sl}` });
    }
};

const makesl = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const isValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};
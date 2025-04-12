const pool = require('../helpers/mysql_config');
const jwt = require('jsonwebtoken');

const doLogin = (req, res) => {
    let token = '';
    let result = {};
    const email = req.body.email;
    const password = req.body.password;
    const query = 'CALL login(?, ?)';

    pool.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }
        if (results[0].length === 0) {
            return res.status(404).json({ error: 'Invalid email or password' });
        }
        result = results[0][0];
        token = jwt.sign({ id: result.userId }, process.env.JWT_SECRET, { expiresIn: 7200 });
        res.status(200).json({ userId:result.userId, investigador: result.Investigador, email:result.email, token });
    });
}

module.exports = doLogin;
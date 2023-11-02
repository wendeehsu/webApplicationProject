const jwt = require('jsonwebtoken');

exports.authenticateToken = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) throw {status: 400, message: "token missing"};

    const decode = jwt.verify(token, "RESTFULAPIs");
    return decode;
}
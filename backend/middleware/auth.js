const jwt = require("jsonwebtoken");
const config = require("config");

function auth(request, response, next){
    const authToken = request.headers['auth-token']; 

    if(authToken === undefined) return response.status(403).send("Auth token is required");
    try {
        const decoded = jwt.verify(authToken, config.get("token-key"));
        request.user = decoded;
    }catch(err){
        return response
    }
    next();
}

module.exports = auth;
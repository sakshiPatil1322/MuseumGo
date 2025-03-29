const {getUser} = require("../service/auth");
const jwt = require("jsonwebtoken");

async function restrictToLoggedinUserOnly(req,res,next){
    const token = req.cookies.uid;

    if (!token) return res.render('login');

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user; // Attach user data to request
        next();
    } catch (error) {
        return res.render('login');
    }
}


const verifyToken = (req, res, next) => {
    const token = req.cookies.uid; // Assuming token is stored in cookies

    if (!token) {
        return res.redirect('/login');  // Redirect if no token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err);
            return res.redirect('/login');  // Redirect if token verification fails
        }

        req.user = decoded;  // Attach user info to the request
        next();  // Proceed to the next middleware or route
    });
};


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.redirect('/login');
    }
};


module.exports={
    restrictToLoggedinUserOnly,
    isAdmin,
    verifyToken
}
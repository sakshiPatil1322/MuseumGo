const {getUser} = require("../service/auth");

async function restrictToLoggedinUserOnly(req,res,next){
    const userUid = req.cookies.uid;

    if(!userUid) return res.render('login');
    const user = getUser(userUid);

    if(!user) return res.render("login");

    req.user = user;
    next();
}

const isAdmin = (req, res, next) => {
    // Check if user session exists and user role is admin
    if (req.session.user && req.session.user.role === 'admin') {
        next(); // Allow access to the admin dashboard
    } else {
        res.redirect('/login'); // Redirect to login page if not admin
    }
};


module.exports={
    restrictToLoggedinUserOnly,
    isAdmin,
}
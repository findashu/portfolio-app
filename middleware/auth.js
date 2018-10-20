module.exports.authenticated = function(req,res,next) {
    req.session.isAuthenticated = req.session.isAuthenticated ? true : false;
    res.locals.isAuthenticated = req.session.isAuthenticated;
    if (req.session.isAuthenticated) {
        res.locals.user = req.session.user;
    }
    next();
}

module.exports.authenticate = function(req,res,next) {
    if(req.session && req.session.isAuthenticated){
        next();
    }else{
        res.redirect('/login');
    }
}
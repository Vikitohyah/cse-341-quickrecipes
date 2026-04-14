const isAuthenticated = (req, res, next) => {
    if (req.session === undefined || req.session.user === undefined) {
        return res.status(401).json({ error: 'You do not have access' });
    }
    next();
};

module.exports = { isAuthenticated };

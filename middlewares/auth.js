exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: '로그인이 필요합니다.' });
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.status(403).json({ message: '이미 로그인한 사용자입니다.' });
    }
}; 
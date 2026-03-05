const jwt=require('jsonwebtoken');
const studentAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render('not');
    }
    try {
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        console.log("JWT ERROR FULL:", err);
        res.render('not');
    }
};
module.exports=studentAuth
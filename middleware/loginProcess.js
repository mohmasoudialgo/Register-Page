const User = require('./../models/user');
const bcrypt = require('bcryptjs');


const loginProcess = async (req,res,next) => {
    const { username, password} = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            req.flash('message', 'نام کاربری یا ایمیل اشتباه است');
            return res.redirect('/login');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            req.flash('message', 'رمز عبور اشتباه است');
            return res.redirect('/login');
        }
        res.redirect('/');
    } catch (error) {
        req.flash('message', 'خطایی در فرآیند ورود رخ داد');
        return res.redirect('/login');
    }

    next();
};

module.exports = {loginProcess};
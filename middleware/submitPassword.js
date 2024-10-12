const User = require('./../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const passwordCheck = require('./../utility/validator');

const updatePassword = async (req, res) => {
    const { token, password,confirmPassword } = req.body; // تغییر نام newPassword به password
    try {
        // بررسی وجود کاربر با توکن معتبر
        const user = await User.findOne({ resetToken: token, tokenExpiration: { $gt: Date.now() } });
        if (!user) {
            req.flash('message', 'توکن معتبر نیست');
            return res.redirect('/password_reset/submit'); // برگرداندن به صفحه بازیابی رمز
        }
        if(password !== confirmPassword) {
            req.flash('message','رمز عبور با تایید آن مطابقت ندارد');
            return res.redirect('/password_reset/submit')
          }

        // بررسی اعتبار رمز عبور
        const errorMessage = passwordCheck.passwordChecker(password, '/password_reset/submit');
        if (errorMessage) {
            req.flash('message', `رمز عبور باید شامل: ${errorMessage.join('، ')}`);
            return res.redirect('/password_reset/submit'); // برگرداندن به صفحه بازیابی رمز
        }

        // هش کردن رمز عبور جدید
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword; // بروزرسانی رمز عبور
        user.resetToken = undefined; // حذف توکن
        user.tokenExpiration = undefined; // حذف تاریخ انقضا توکن
        await user.save(); // ذخیره تغییرات

        req.flash('message', 'رمز عبور با موفقیت تغییر یافت');
        res.redirect('/login'); // هدایت به صفحه ورود
    } catch (error) {
        console.error('Error updating password:', error); // ثبت خطا در کنسول
        req.flash('message', 'خطا در تغییر رمز عبور');
        res.redirect('/password_reset/submit'); // برگرداندن به صفحه بازیابی رمز
    }
};

module.exports = { updatePassword };

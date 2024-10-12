const crypto = require('crypto'); // این خط را می‌توانید حذف کنید
const nodemailer = require('nodemailer');
const User = require('./../models/user');

require('dotenv').config();

const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // تولید یک عدد 6 رقمی
};

const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            req.flash('message', 'کاربری با این ایمیل یافت نشد');
            return res.redirect('/password_reset');
        }

        const code = generateResetCode(); // ایجاد کد 6 رقمی
        user.resetToken = code; // ذخیره کد به جای توکن
        user.tokenExpiration = Date.now() + 1800000; // تاریخ انقضای کد
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS   
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'بازنشانی رمز عبور',
            html: `<p>کد بازنشانی رمز عبور شما: <strong>${code}</strong></p>` // ارسال کد به کاربر
        };

        transporter.sendMail(mailOptions);
        req.flash('message', 'ایمیل ارسال شد');
        res.redirect('/password_reset/submit'); // به صفحه ثبت کد و رمز جدید هدایت می‌شود
    } catch (error) {
        req.flash('message', 'خطا در پردازش درخواست');
        res.redirect('/password_reset');
    }
};

module.exports = { sendResetPasswordEmail };

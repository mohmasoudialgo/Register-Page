const user = require('./../models/user');
const bcrypt = require('bcryptjs');
const passwordCheck = require('./../utility/validator')

const registerProcess = async (req, res, next) => {
  const { username, email, password,confirmPassword } = req.body;

  if (!username || !email || !password) {
    req.flash('message', 'لطفا تمام فیلد‌ها را پر کنید');
    return res.redirect('/register');
  }

  if (username.length < 6) {
    req.flash('message', 'نام کاربری حداقل باید ۶ کاراکتر باشد');
    return res.redirect('/register');
  }
  if(password !== confirmPassword) {
    req.flash('message','رمز عبور با تایید آن مطابقت ندارد');
    return res.redirect('/register')
  }
  

  const errorMessage = passwordCheck.passwordChecker(password,'/register')
  if(errorMessage){
    req.flash('message', `رمز عبور باید شامل: ${errorMessage.join('، ')}`);
    return res.redirect("/register");
  }
  console.log(errorMessage);

  try {
    const existingUser = await user.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      req.flash('message', 'نام کاربری یا ایمیل قبلاً ثبت شده است.');
      return res.redirect('/register');
    }
  } catch (error) {
    req.flash('message', 'خطا در بررسی تکراری بودن.');
    return res.redirect('/register');
  }

  next();
};

const userSubmit = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.redirect('/login');
  } catch (error) {
    req.flash('message', 'خطا در ثبت نام');
    return res.redirect('/register');
  }
};

module.exports = { registerProcess, userSubmit };

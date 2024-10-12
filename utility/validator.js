const PasswordValidator = require('password-validator');


function passwordChecker(password) {
    
const schema = new PasswordValidator();

schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().symbols();

const passwordErrorMessages = {
  min: 'رمز عبور باید حداقل ۸ کاراکتر باشد.',
  uppercase: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد.',
  lowercase: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد.',
  digits: 'رمز عبور باید حداقل یک عدد داشته باشد.',
  symbols: 'رمز عبور باید حداقل یک نماد (مثل @, #, !) داشته باشد.'
};

    if (!schema.validate(password)) {
        const errors = schema.validate(password, { list: true });
        const errorMessages = errors.map(error => passwordErrorMessages[error] || `خطای نامشخص: ${error}`);
        return errorMessages
   }
   return false
}

module.exports = {passwordChecker}





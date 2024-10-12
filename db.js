const mongoose = require('mongoose');

connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/becca2')
        console.log("connected Database");
    }
    catch (err) {
        console.log('error',err);
        process.exit(1);

    }

}

module.exports = connectDb;

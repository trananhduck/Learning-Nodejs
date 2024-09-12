const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/abc', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected!'))
    .catch((error) => console.error('Connection error:', error));
const Schema = mongoose.Schema;
const accountSchema = new Schema({
    username: String,
    password: String
}, {
    collection: 'account'
})

const AccountModel = mongoose.model('account', accountSchema)
for (let i = 0; i < 10; i++) {
    AccountModel.create({
        username: 'Std_' + i,
        password: '123456'
    })
}
module.exports = AccountModel
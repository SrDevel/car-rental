const bcrypt = require('bcrypt');

const encrypt = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const decrypt = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

module.exports = {
    encrypt,
    decrypt
};
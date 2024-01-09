const bcrypt = require(`bcrypt`);

// mã hoá dữ liệu
let hash = (data) => {
    return bcrypt.hashSync(data, bcrypt.genSaltSync());
};

// kiểm tra dữ liệu cần kiểm tra với dữ liệu đã má hoá
let compare = (data, hashData) => {
    return bcrypt.compareSync(data, hashData);
};

/*
vd: password = 123
hashPass = hash(password)
hashPass sẽ ra một dãy kí tự. vd dsdsdss

kiểm tra mật khẩu với mã hash
compare(123, dsdsdss) == true ? 'đúng' : 'sai'
*/

module.exports = { hash, compare };

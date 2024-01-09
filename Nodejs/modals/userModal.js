const ConfigSQLite = require('../config/sqlite')

// userId
// email
// password
// role

class UserModal extends ConfigSQLite {

    // thêm 1 user
    addUser({ email, password, role = 'patient' }) {
        this.connectDatabase()
        const query = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`

        return new Promise((resolve, reject) => {
            const self = this;

            this.db.run(query, [email, password, role], function (error, data) {
                if (error)
                    return reject(error)
                return resolve({ userId: this.lastID })
            })

            this.closeDatabase()
        })
    }

    // lấy 1 user
    getUser({ email }) {
        this.connectDatabase()

        const query = 'SELECT * FROM users WHERE email=(?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [email], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    // lấy 1 user by id
    getUserById({ userId }) {
        this.connectDatabase()

        const query = 'SELECT * FROM users WHERE userId=(?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [userId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    changePass({ email, password }) {
        this.connectDatabase()

        const query = 'UPDATE users set password = (?) where email= (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [password, email], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    deleteUser({ email }) {
        this.connectDatabase()

        const query = 'DELETE FROM users WHERE email = (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [email], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    // chắc không cần dâu
    // deleteUsers({ array }) {
    //     const query = 'DELETE FROM users WHERE email IN (?)';

    //     return new Promise((resolve, reject) => {
    //         this.db.all(query, [array], (error, data) => {
    //             if (error)
    //                 return reject(error)
    //             resolve(data)
    //         })
    //     })
    // }
}

module.exports = UserModal
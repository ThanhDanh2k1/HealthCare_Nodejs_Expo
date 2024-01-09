const ConfigSQLite = require('../config/sqlite')

// otpId
// email
// otp
// expiresAt
// isActive

class OtpModal extends ConfigSQLite {

    //
    addOtp({ email, otp }) {
        this.connectDatabase()

        const expiresAt = Date.now() + 5 * 60 * 1000
        const query = `INSERT INTO otps (email, otp, expiresAt) VALUES (?, ?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query, [email, otp, expiresAt], (error, data) => {
                if (error)
                    return reject(error);
                return resolve(data)
            })

            this.closeDatabase()
        })

    }

    //
    getEmail({ email }) {
        this.connectDatabase()

        const time = Date.now()
        const query = 'SELECT * FROM otps WHERE email=(?) and expiresAt > (?) and isActive = false';

        return new Promise((resolve, reject) => {
            this.db.all(query, [email, time], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    verifyOtp({ email, otp }) {
        this.connectDatabase()

        const time = Date.now()

        const query = `SELECT * FROM otps WHERE email = (?) and otp = (?) and expiresAt > (?) and isActive = 'false'`

        return new Promise((resolve, reject) => {
            this.db.all(query, [email, otp, time], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    updateOtp({ email }) {
        this.connectDatabase()

        const query = `UPDATE otps SET isActive = 'true' WHERE email = (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [email], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }
}

module.exports = OtpModal
const ConfigSQLite = require('../config/sqlite')

// patientId
// image
// firstName
// lastName
// address
// birthday
// gender
// phone
// email
// userId

class PatientModal extends ConfigSQLite {

    //
    addPatient({ image = 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg', firstName = 'Người dùng', lastName = '', address = '', birthday = '1990-01-01', gender = 'Khác', phone = '', email = '', userId = '' }) {
        this.connectDatabase()

        const query = `INSERT INTO patients (
            image,
            firstName,
            lastName,
            address,
            birthday,
            gender,
            phone,
            email,
            userId 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [image, firstName, lastName, address, birthday, gender, phone, email, userId],
                (error, data) => {
                    if (error)
                        return reject(error);
                    return resolve(data)

                }
            )

            this.closeDatabase()
        })
    }

    //
    getPatient({ email }) {
        this.connectDatabase()

        const query = 'SELECT * FROM patients WHERE email=(?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [email], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    // 
    getAllPatients() {
        this.connectDatabase()

        const query = 'SELECT * FROM patients';

        return new Promise((resolve, reject) => {
            this.db.all(query, (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    // 
    updatePatient({ image, firstName, lastName, address, birthday, gender, phone, userId }) {
        this.connectDatabase()

        const query = ` UPDATE patients
                        SET image = (?),
                            firstName = (?),
                            lastName = (?),
                            address = (?),
                            birthday = (?),
                            gender = (?),
                            phone = (?)
                        WHERE userId = (?)`;

        return new Promise((resolve, reject) => {
            this.db.run(query, [image, firstName, lastName, address, birthday, gender, phone, userId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }
}

module.exports = PatientModal
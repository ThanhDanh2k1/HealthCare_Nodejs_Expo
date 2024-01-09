const ConfigSQLite = require('../config/sqlite')

// doctorId
// image
// firstName
// lastName
// address
// phone
// about
// specialistId
// email
// userId

let data = [
    { image: 'doctor_PNG15959.png', firstName: 'Khám bệnh', lastName: 'A', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 1, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'doctor-hd-png-doctor-clip-art-library-530.png', firstName: 'Khám bệnh', lastName: 'B', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 2, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'BS6.jpg', firstName: 'Khám bệnh', lastName: 'C', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 3, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'BS7.jpg', firstName: 'Khám bệnh', lastName: 'D', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 4, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'BS3.png', firstName: 'Khám bệnh', lastName: 'E', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 5, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'BS4.png', firstName: 'Khám bệnh', lastName: 'F', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 6, email: 'thanhdanh@gmai.com', userId: 1 },
    { image: 'BS5.png', firstName: 'Khám bệnh', lastName: 'G', address: 'Long An', phone: '0933321767', about: 'Giới thiệu', specialistId: 7, email: 'thanhdanh@gmai.com', userId: 1 },
]

class DoctorModal extends ConfigSQLite {

    // thêm data mẫu ở trên vào database
    autoData() {
        this.connectDatabase()

        const insertData = (data) => {
            const stmt = this.db.prepare(`
                INSERT INTO doctors (
                    image,
                    firstName,
                    lastName,
                    address,
                    phone,
                    about,
                    specialistId,
                    email,
                    userId 
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

            data.forEach(entry => {
                stmt.run(
                    entry.image,
                    entry.firstName,
                    entry.lastName,
                    entry.address,
                    entry.phone,
                    entry.about,
                    entry.specialistId,
                    entry.email,
                    entry.userId,
                );
            });

            stmt.finalize();
        };

        insertData(data);

        this.closeDatabase()
    }

    //
    addDoctor({
        image = 'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
        firstName = 'Người dùng',
        lastName = '',
        address = '',
        phone = '',
        about = '',
        specialistId,
        email = '',
        userId = ''
    }) {
        this.connectDatabase()

        const query = `INSERT INTO doctors (
            image,
            firstName,
            lastName,
            address,
            phone,
            about,
            specialistId,
            email,
            userId 
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [image, firstName, lastName, address, phone, about, specialistId, email, userId],
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
    getDoctor({ email, doctorId }) {
        this.connectDatabase()
        const query = 'SELECT * FROM doctors WHERE email=(?) or doctorId=(?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [email, doctorId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    getAllDoctors({ limit = 999999999 }) {
        this.connectDatabase()
        const query = 'SELECT * FROM doctors LIMIT (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [limit], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    searchDoctor({ specialistId, name = '' }) {
        let query

        if (specialistId == 0) {
            specialistId = undefined
        }

        if (name == 'Tất cả') {
            name = ''
        }

        this.connectDatabase()

        if (specialistId) {
            query = `
                SELECT image, firstName, lastName, address, phone, email, doctorId, specialistId
                FROM doctors
                WHERE lastName || ' ' || firstName LIKE (?) and specialistId = (?)
            `;

            return new Promise((resolve, reject) => {
                this.db.all(query, [`%${name}%`, specialistId], (error, data) => {
                    if (error)
                        return reject(error)
                    resolve(data)
                })

                this.closeDatabase()
            })
        } else {
            query = `
                SELECT image, firstName, lastName, address, phone, email, doctorId, specialistId
                FROM doctors
                WHERE lastName || ' ' || firstName LIKE (?)
            `;

            return new Promise((resolve, reject) => {
                this.db.all(query, [`%${name}%`], (error, data) => {
                    if (error)
                        return reject(error)
                    resolve(data)
                })

                this.closeDatabase()
            })
        }

    }

    // 
    updateDoctor({ image, firstName, lastName, address, phone, specialistId, userId }) {
        this.connectDatabase()
        const query = ` UPDATE doctors
                        SET image = (?), 
                            firstName = (?),
                            lastName = (?),
                            address = (?),
                            phone = (?),
                            specialistId = (?)
                        WHERE userId = (?)`;

        return new Promise((resolve, reject) => {
            this.db.all(query, [image, firstName, lastName, address, phone, specialistId, userId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }
}

module.exports = DoctorModal
const ConfigSQLite = require('../config/sqlite')
const { bcrypt } = require('../utils')


// specialistId
// name
// image

let data = [
    { name: 'Cấp Cứu', image: 'heart.png' },
    { name: 'Ngoại', image: 'stomach.png' },
    { name: 'Nội', image: 'lungs.png' },
    { name: 'SK Sinh Sản', image: 'sinh.png' },
    { name: 'Nhi', image: 'nhi.png' },
    { name: 'Truyền Nhiễm', image: 'truyennhiemk.png' },
    { name: 'Y Cổ Truyền', image: 'yhoc.png' },
    { name: 'Xét Nghiệm', image: 'xetnghiem.png' },
    { name: 'Chuẩn Đoán HA', image: 'chandoanhinhanh.png' },
]

class SpecialistModal extends ConfigSQLite {

    // thêm data mẫu ở trên vào database
    addData() {
        this.connectDatabase()

        this.db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            ['admin@gmail.com', bcrypt.hash('1234'), 'admin'],
        )

        const insertData = (data) => {
            const stmt = this.db.prepare('INSERT INTO specialists (name, image) VALUES (?, ?)');

            data.forEach(entry => {
                stmt.run(entry.name, entry.image);
            });

            stmt.finalize();
        };

        insertData(data);

        this.closeDatabase()
    }

    //
    get({ limit = 999999999 }) {
        this.connectDatabase()

        const query = `SELECT * FROM specialists LIMIT (?)`

        return new Promise((resolve, reject) => {
            this.db.all(query, [limit],
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
    create({ name, image }) {
        this.connectDatabase()

        const query = `INSERT INTO specialists (name, image) VALUES (?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query, [name, image],
                (error, data) => {
                    if (error)
                        return reject(error);
                    return resolve(data)

                }
            )

            this.closeDatabase()
        })
    }

}

module.exports = SpecialistModal
const sqlite3 = require('sqlite3');

const dbPath = process.env.DATABASE_NAME

class ConfigSQLite {
    constructor() {
        this.db = null
    }

    connectDatabase() {
        try {
            this.db = new sqlite3.Database(dbPath)

            // using foreign key
            this.db.run('PRAGMA foreign_keys = ON')

            console.log('connect database success');
        } catch (error) {
            console.error('connect database fail');
            console.error(error);
        }
    }

    // tạo table
    createTable() {
        // // bảng specialists
        this.db.run(`
            CREATE TABLE IF NOT EXISTS specialists(
                specialistId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                image TEXT
            )
        `)

        // // bảng otps
        this.db.run(`
            CREATE TABLE IF NOT EXISTS otps(
                otpId INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                otp TEXT NOT NULL,
                expiresAt DATETIME,
                isActive TEXT CHECK (isActive IN ('true', 'false')) DEFAULT 'false'
            )
        `)

        // // bảng users
        this.db.run(`
            CREATE TABLE IF NOT EXISTS users(
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT CHECK(role IN('admin', 'doctor', 'patient'))
            )
        `)

        // // bảng doctors
        this.db.run(`
            CREATE TABLE IF NOT EXISTS doctors(
                doctorId INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                firstName TEXT,
                lastName TEXT,
                address TEXT,
                phone TEXT,
                about TEXT,
                specialistId INTEGER,
                email TEXT NOT NULL,
                userId INTEGER,
                FOREIGN KEY (specialistId) REFERENCES specialists(specialistId),
                FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
            )
        `)

        // // bảng patients
        this.db.run(`
            CREATE TABLE IF NOT EXISTS patients(
                patientId INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                firstName TEXT,
                lastName TEXT,
                address TEXT,
                birthday DATE CHECK (birthday LIKE '____-__-__'),
                gender TEXT CHECK(gender IN('Nam', 'Nữ', 'Khác')),
                phone TEXT,
                email TEXT NOT NULL,
                userId INTEGER,
                FOREIGN KEY(userId) REFERENCES users(userId) ON DELETE CASCADE
            )
        `)

        // bảng calendars
        this.db.run(`
            CREATE TABLE IF NOT EXISTS calendars(
                calendarId INTEGER PRIMARY KEY AUTOINCREMENT,
                date DATE CHECK (date LIKE '____-__-__'),
                time TIME CHECK (time LIKE '__:__'),
                patientId INTEGER,
                doctorId INTEGER,
                FOREIGN KEY (patientId) REFERENCES patients(patientId),
                FOREIGN KEY (doctorId) REFERENCES doctors(doctorId)
            )
        `)

        // // bảng groups
        this.db.run(`
            CREATE TABLE IF NOT EXISTS groups(
                groupId INTEGER PRIMARY KEY AUTOINCREMENT,
                userIdA INTEGER NOT NULL,
                userIdB INTEGER NOT NULL,
                isBlock TEXT CHECK (isBlock IN ('true', 'false')) DEFAULT 'false',
                FOREIGN KEY(userIdA) REFERENCES users(userId),
                FOREIGN KEY(userIdB) REFERENCES users(userId)
            )
        `)

        // bảng messages
        this.db.run(`
            CREATE TABLE IF NOT EXISTS messages(
                messageId INTEGER PRIMARY KEY AUTOINCREMENT,
                senderId INTEGER NOT NULL,
                content TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                isRead TEXT CHECK (isRead IN ('true', 'false')) DEFAULT 'false',
                groupId INTERGER NOT NULL,
                FOREIGN KEY(senderId) REFERENCES users(userId) ON DELETE CASCADE,
                FOREIGN KEY(groupId) REFERENCES groups(groupId) ON DELETE CASCADE
            )
        `)


    }

    closeDatabase() {
        try {
            this.db.close()
            console.log('close database success');
        } catch (error) {
            console.error('close database fail');
            console.error(error);

        }
    }
}

module.exports = ConfigSQLite
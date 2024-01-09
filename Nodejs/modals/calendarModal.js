const ConfigSQLite = require('../config/sqlite')

const moment = require('moment');

// calendarId
// date
// time
// patientId
// doctorId

class CalendarModal extends ConfigSQLite {

    //
    createCalendar({ date, time, patientId, doctorId }) {
        this.connectDatabase()

        const query = ` INSERT INTO calendars (
                            date,
                            time,
                            patientId,
                            doctorId
                        ) VALUES (?, ?, ?, ?)`

        return new Promise((resolve, reject) => {
            this.db.run(query,
                [date, time, patientId, doctorId],
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
    update({ date, time, calendarId, patientId }) {
        console.log(date, time, Number(calendarId), patientId);
        this.connectDatabase()

        const query =   `UPDATE calendars
                        SET date = (?), 
                            time = (?)
                        WHERE calendarId = (?) and patientId = (?)` ;

        return new Promise((resolve, reject) => {
            this.db.all(query, [date, time, Number(calendarId), patientId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    getCalendarbyDoctor({ doctorId }) {
        this.connectDatabase()

        const startDate = moment().add(1, 'days').format('YYYY-MM-DD')
        const endDate = moment().add(8, 'days').format('YYYY-MM-DD')

        const query = 'SELECT * FROM calendars WHERE doctorId=(?) and date BETWEEN (?) AND (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [doctorId, startDate, endDate], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    getCalendarByPatient({ patientId, limit = 999999999 }) {
        this.connectDatabase()

        const date = moment().format('YYYY-MM-DD')
        const time = moment().format('HH:mm')

        const query = `
            SELECT calendarId, date, time, firstName, image, lastName, address, email, doctors.doctorId
            FROM calendars
            INNER JOIN doctors ON calendars.doctorId = doctors.doctorId
            WHERE patientId=(?) and date > (?) or ( date = (?) and time > (?) ) LIMIT (?)
        `;

        return new Promise((resolve, reject) => {
            this.db.all(query, [patientId, date, date, time, limit], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    getCalendarHistory({ patientId, limit = 999999999 }) {
        this.connectDatabase()

        const date = moment().format('YYYY-MM-DD')
        const time = moment().format('HH:mm')

        const query = `
            SELECT calendarId, date, time, image, firstName, lastName, address, email, doctors.doctorId
            FROM calendars
            INNER JOIN doctors ON calendars.doctorId = doctors.doctorId
            WHERE patientId=(?) and date < (?) or ( date = (?) and time < (?) ) LIMIT (?)
        `;

        return new Promise((resolve, reject) => {
            this.db.all(query, [patientId, date, date, time, limit], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    getOneCalendar({ doctorId, date, time }) {
        this.connectDatabase()

        const query = 'SELECT * FROM calendars WHERE doctorId = (?) and date = (?) AND time = (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [doctorId, date, time], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }

    //
    cancel({ patientId, calendarId }) {
        this.connectDatabase()

        const query = 'DELETE FROM calendars WHERE patientId=(?) and calendarId = (?)';

        return new Promise((resolve, reject) => {
            this.db.all(query, [patientId, calendarId], (error, data) => {
                if (error)
                    return reject(error)
                resolve(data)
            })

            this.closeDatabase()
        })
    }
}

module.exports = CalendarModal
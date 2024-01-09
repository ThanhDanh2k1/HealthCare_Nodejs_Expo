//
const { CalendarModal } = require('../modals')

// 
const calendarModal = new CalendarModal

module.exports.createCalendar = async (req, res, next) => {
    try {
        console.log('calendar/create');

        let { patientId } = req.user
        let { doctorId, date, time } = req.body

        let data = await calendarModal.getOneCalendar({ doctorId, date, time })

        if (data.length !== 0) {
            res.status(400).send('Lịch đã được đăng ký')
        } else {
            await calendarModal.createCalendar({ ...req.body, patientId })
            console.log(req.body);
            res.status(201).send('tạo thành công')
        }
    } catch (error) {
        next(error)
    }
}


//
module.exports.updateCalendar = async (req, res, next) => {
    try {
        console.log('calendar/update');

        const { patientId } = req.user

        await calendarModal.update({ ...req.body, patientId: patientId })

        res.status(200).send('update thành công')
    } catch (error) {
        next(error)
    }
}


module.exports.getCalendar = async (req, res, next) => {
    try {
        console.log('calendar/get');

        let data = await calendarModal.getCalendarbyDoctor({ ...req.body })

        res.status(201).send(data)
    } catch (error) {
        next(error)
    }
}

module.exports.getByPatient = async (req, res, next) => {
    try {
        console.log('calendar/patient');

        const { patientId } = req.user

        let data = await calendarModal.getCalendarByPatient({ ...req.body, patientId })

        res.status(201).send(data)
    } catch (error) {
        next(error)
    }
}

module.exports.getHistory = async (req, res, next) => {
    try {
        console.log('calendar/history');

        const { patientId } = req.user

        let data = await calendarModal.getCalendarHistory({ ...req.body, patientId })

        res.status(201).send(data)
    } catch (error) {
        next(error)
    }
}

module.exports.cancelCalendar = async (req, res, next) => {
    try {
        console.log('calendar/cancel');

        const { patientId } = req.user

        await calendarModal.cancel({ ...req.body, patientId })

        res.status(201).send('Huỷ lịch thành công')
    } catch (error) {
        next(error)
    }
}


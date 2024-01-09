// 
const { SpecialistModal, DoctorModal } = require('../modals')

// 
const doctorModal = new DoctorModal
const specialistModal = new SpecialistModal

// 
module.exports.autoDoctor = async (req, res, next) => {
    try {
        console.log('/auto/doctor');

        await doctorModal.autoData()

        res.status(201).send('Thêm thành công')
    } catch (error) {
        next(error)
    }
}

module.exports.autoSpecialist = async (req, res, next) => {
    try {
        console.log('/auto/specialist');

        await specialistModal.addData()

        res.status(201).send('Thêm thành công')
    } catch (error) {
        next(error)
    }
}

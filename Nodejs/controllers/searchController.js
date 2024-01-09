// 
const { SpecialistModal, DoctorModal } = require('../modals')

// 
const specialistModal = new SpecialistModal
const doctorModal = new DoctorModal

// 
module.exports.getDoctor = async (req, res, next) => {
    try {
        console.log('/search/doctor');

        let { doctorId } = req.body

        let data = await doctorModal.getDoctor({ doctorId })

        if (data.length === 0) {
            res.status(400).send('Không tìm thấy bác sĩ')
        } {
            res.status(201).send(data)
        }

    } catch (error) {
        next(error)
    }
}

// 
module.exports.searchData = async (req, res, next) => {
    try {

        console.log('/search/data');

        let data = await doctorModal.searchDoctor({ ...req.body })

        res.status(201).send(data)

    } catch (error) {
        next(error)
    }
}
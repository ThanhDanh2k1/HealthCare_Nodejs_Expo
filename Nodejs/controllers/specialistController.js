// 
const { SpecialistModal } = require('../modals')

// 
const specialistModal = new SpecialistModal

// 
module.exports.getData = async (req, res, next) => {
    try {
        console.log('/specialist/get');
        let { limit } = req.body

        let data = await specialistModal.get({ limit })

        res.status(201).send(data)
    } catch (error) {
        next(error)
    }
}

module.exports.addData = async (req, res, next) => {
    try {
        console.log('/specialist/add');
        let { name } = req.body
        let image = req.file.filename


        await specialistModal.create({ image, name })

        res.status(201).send('ok')
    } catch (error) {
        next(error)
    }
}
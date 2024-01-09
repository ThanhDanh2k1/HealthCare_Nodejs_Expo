const user = require('./userController')
const chat = require('./chatController')
const calendar = require('./calendarController')
const specialist = require('./specialistController')
const autoData = require('./autoDataController')
const search = require('./searchController')

module.exports = {
    user,
    chat,
    calendar,
    specialist,
    autoData,
    search
}